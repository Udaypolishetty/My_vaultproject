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

    @Scheduled(cron = "0 0 2 * * *") // every minute for testing
    public void archiveOldIdeas() {
        LocalDateTime now = LocalDateTime.now();
        List<Idea> allIdeas = ideaRepository.findAll();

        for (Idea idea : allIdeas) {
            if (idea.isArchived()) continue;

            boolean shouldArchive = false;

                if ("IMPLEMENTED".equals(idea.getStatus()) &&
            idea.getReviewedAt() != null &&
            idea.getReviewedAt().isBefore(now.minusDays(5))) {
            shouldArchive = true;
        }

        if ("REJECTED".equals(idea.getStatus()) &&
            idea.getReviewedAt() != null &&
            idea.getReviewedAt().isBefore(now.minusDays(5))) {
            shouldArchive = true;
        }

            if (shouldArchive) {
                idea.setArchived(true);
                idea.setArchivedAt(now);
                ideaRepository.save(idea);
            }
        }
    }
}