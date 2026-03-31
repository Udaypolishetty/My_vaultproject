// package com.example.PdfBackend.Scheduler;

// import com.example.PdfBackend.model.Warning;
// import com.example.PdfBackend.repository.WarningRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Component;

// import java.time.LocalDateTime;
// import java.util.List;

// @Component
// @RequiredArgsConstructor
// public class WarningScheduler {

//     private final WarningRepository warningRepository;

//     // ✅ runs every day at 3 AM — deletes warnings older than 7 days
//     @Scheduled(cron = "0 0 3 * * *")
//     public void deleteExpiredWarnings() {
//         LocalDateTime cutoff = LocalDateTime.now().minusDays(7);
//         List<Warning> expired = warningRepository.findByCreatedAtBefore(cutoff);
//         if (!expired.isEmpty()) {
//             warningRepository.deleteAll(expired);
//             System.out.println("🗑️ Deleted " + expired.size() + " expired warnings");
//         }
//     }



    
// }




package com.example.PdfBackend.Schedular;

import com.example.PdfBackend.model.Warning;
import com.example.PdfBackend.model.Notification;
import com.example.PdfBackend.repository.WarningRepository;
import com.example.PdfBackend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WarningScheduler {

    private final WarningRepository warningRepository;
    private final NotificationRepository notificationRepository;

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

    // ✅ runs every day at 3 AM — deletes notifications older than 3 days
    @Scheduled(cron = "0 0 3 * * *")
    public void deleteExpiredNotifications() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(3);
        List<Notification> expired = notificationRepository.findByCreatedAtBefore(cutoff);
        if (!expired.isEmpty()) {
            notificationRepository.deleteAll(expired);
            System.out.println("🗑️ Deleted " + expired.size() + " expired notifications");
        }
    }
}