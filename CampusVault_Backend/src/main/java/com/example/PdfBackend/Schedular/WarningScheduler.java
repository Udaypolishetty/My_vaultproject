package com.example.PdfBackend.Scheduler;

import com.example.PdfBackend.model.Warning;
import com.example.PdfBackend.repository.WarningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WarningScheduler {

    private final WarningRepository warningRepository;

    // ✅ runs every day at 3 AM — deletes warnings older than 7 days
    @Scheduled(cron = "0 0 3 * * *")
    public void deleteExpiredWarnings() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(7);
        List<Warning> expired = warningRepository.findByCreatedAtBefore(cutoff);
        if (!expired.isEmpty()) {
            warningRepository.deleteAll(expired);
            System.out.println("🗑️ Deleted " + expired.size() + " expired warnings");
        }
    }
}