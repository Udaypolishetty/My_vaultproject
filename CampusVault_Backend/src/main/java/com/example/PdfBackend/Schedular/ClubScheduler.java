package com.example.PdfBackend.Scheduler;

import com.example.PdfBackend.model.Club;
import com.example.PdfBackend.repository.ClubRepository;
import com.example.PdfBackend.Service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ClubScheduler {

    private final ClubRepository clubRepository;
    private final NotificationService notificationService;

    // ✅ runs every hour — clean messages older than 48hrs
    @Scheduled(cron = "0 0 * * * *")
    public void cleanOldMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
        List<Club> clubs = clubRepository.findAll();
        for (Club club : clubs) {
            int before = club.getMessages().size();
            club.getMessages().removeIf(m ->
                m.getCreatedAt() != null && m.getCreatedAt().isBefore(cutoff)
            );
            if (club.getMessages().size() != before) {
                clubRepository.save(club);
            }
        }
    }

    // ✅ runs daily at 9AM — check semester end warnings
    @Scheduled(cron = "0 0 9 * * *")
    public void checkSemesterEndWarnings() {
        List<Club> clubs = clubRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (Club club : clubs) {
            if (!"ACTIVE".equals(club.getStatus()) || club.getSemesterEndDate() == null) continue;

            long daysLeft = java.time.Duration.between(now, club.getSemesterEndDate()).toDays();

            // ✅ 30-day warning
            if (daysLeft <= 30 && daysLeft > 7 && !club.isThirtyDayWarningSent()) {
                notificationService.create(club.getCreatedBy(),
                    "⏳ Club \"" + club.getTitle() + "\" semester ends in " + daysLeft + " days. Plan renewal or dissolution.",
                    "CLUB_SEMESTER_WARNING");
                club.setThirtyDayWarningSent(true);
                clubRepository.save(club);
            }

            // ✅ 7-day warning
            if (daysLeft <= 7 && daysLeft > 0 && !club.isSevenDayWarningSent()) {
                notificationService.create(club.getCreatedBy(),
                    "🚨 Club \"" + club.getTitle() + "\" semester ends in " + daysLeft + " days!",
                    "CLUB_SEMESTER_WARNING");
                for (String roll : club.getMembers()) {
                    notificationService.create(roll,
                        "🚨 \"" + club.getTitle() + "\" semester ends in " + daysLeft + " days!",
                        "CLUB_SEMESTER_WARNING");
                }
                club.setSevenDayWarningSent(true);
                clubRepository.save(club);
            }

            // ✅ auto-mark COMPLETED when semester ends
            if (daysLeft <= 0 && "ACTIVE".equals(club.getStatus())) {
                club.setStatus("COMPLETED");
                notificationService.create(club.getCreatedBy(),
                    "📋 Club \"" + club.getTitle() + "\" semester has ended. Please renew or dissolve from the dashboard.",
                    "CLUB_SEMESTER_ENDED");
                clubRepository.save(club);
            }
        }
    }

    // ✅ runs every 2 hours — confirm pending members after 2 days
    @Scheduled(cron = "0 0 */2 * * *")
    public void confirmPendingMembers() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(2);
        List<Club> clubs = clubRepository.findAll();

        for (Club club : clubs) {
            List<Club.PendingMember> toConfirm = club.getPendingMembers().stream()
                .filter(p -> p.getJoinedAt() != null && p.getJoinedAt().isBefore(cutoff))
                .collect(Collectors.toList());

            if (!toConfirm.isEmpty()) {
                for (Club.PendingMember p : toConfirm) {
                    club.getMembers().add(p.getRollNumber());
                    club.getPendingMembers().remove(p);
                    notificationService.create(p.getRollNumber(),
                        "🎉 You are now a confirmed member of \"" + club.getTitle() + "\"!",
                        "CLUB_CONFIRMED");
                }
                clubRepository.save(club);
            }
        }
    }
}