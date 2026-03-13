package com.example.PdfBackend.Scheduler;

import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.repository.IdeaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class IdeaArchiveScheduler {

    private final IdeaRepository ideaRepository;

    // runs every day at 2AM
    @Scheduled(cron = "0 0 2 * * *")
    public void archiveOldIdeas() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(5);

        List<Idea> candidates = ideaRepository.findAll().stream()
            .filter(idea -> !idea.isArchived())
            .filter(idea -> {
                String status = idea.getStatus();
                return "IMPLEMENTED".equals(status) || "REJECTED".equals(status);
            })
            .filter(idea -> idea.getCreatedAt() != null && idea.getCreatedAt().isBefore(cutoff))
            .toList();

        for (Idea idea : candidates) {
            idea.setArchived(true);
            idea.setArchivedAt(LocalDateTime.now());
            ideaRepository.save(idea);
        }

        System.out.println("[Scheduler] Archived " + candidates.size() + " ideas.");
    }

    // runs every day at 2:30AM — hard delete stale archived ideas
    @Scheduled(cron = "0 30 2 * * *")
    public void deleteStaleIdeas() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(5);

        List<Idea> toDelete = ideaRepository.findAll().stream()
            .filter(idea -> idea.isArchived())
            .filter(idea -> idea.getArchivedAt() != null && idea.getArchivedAt().isBefore(cutoff))
            .filter(idea -> {
                // ✅ never delete IMPLEMENTED ideas with likes > 5 — leaderboard legends
                if ("IMPLEMENTED".equals(idea.getStatus()) && idea.getLikes() > 5) {
                    return false;
                }
                return true;
            })
            .toList();

        ideaRepository.deleteAll(toDelete);
        System.out.println("[Scheduler] Hard deleted " + toDelete.size() + " stale ideas.");
    }
}