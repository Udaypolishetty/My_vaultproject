
package com.example.PdfBackend.Service;

import com.example.PdfBackend.model.Notification;
import com.example.PdfBackend.repository.NotificationRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final StudentProfileRepository studentRepository;
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void addEmitter(String rollNumber, SseEmitter emitter) {
        emitters.put(rollNumber, emitter);
    }

    public void removeEmitter(String rollNumber) {
        emitters.remove(rollNumber);
    }

    public void create(String recipientRollNumber, String message, String type) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        boolean recentExists = notificationRepository
            .existsByRecipientRollNumberAndMessageAndCreatedAtAfter(
                recipientRollNumber, message, oneHourAgo
            );
        if (recentExists) return;

        Notification notif = new Notification(recipientRollNumber, message, type);
        notificationRepository.save(notif);
        pushToUser(recipientRollNumber, notif);
    }

    private void pushToUser(String rollNumber, Notification notif) {
        SseEmitter emitter = emitters.get(rollNumber);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                    .name("notification")
                    .data(notif));
            } catch (Exception e) {
                emitters.remove(rollNumber);
            }
        }
    }

    // ✅ Broadcast ONLY to ADMIN — receives full message (incl. contact)
    public void broadcastToAdmins(String message, String type) {
        studentRepository.findAll().stream()
            .filter(s -> s.getRole() != null && s.getRole().toString().equals("ADMIN"))
            .forEach(s -> create(s.getRollNumber(), message, type));
    }
 
    // ✅ Broadcast ONLY to MODERATORS — receives limited message (no contact)
    public void broadcastToMods(String message, String type) {
        studentRepository.findAll().stream()
            .filter(s -> s.getRole() != null && s.getRole().toString().equals("MODERATOR"))
            .forEach(s -> create(s.getRollNumber(), message, type));
    }

    public List<Notification> getAll(String rollNumber) {
        return notificationRepository.findByRecipientRollNumberOrderByCreatedAtDesc(rollNumber);
    }

    public long getUnreadCount(String rollNumber) {
        return notificationRepository.countByRecipientRollNumberAndIsRead(rollNumber, false);
    }

    public void markAllRead(String rollNumber) {
        List<Notification> unread = notificationRepository
            .findByRecipientRollNumberAndIsRead(rollNumber, false);
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    // ✅ manual delete by user
    public void deleteNotification(String notifId, String rollNumber) {
        notificationRepository.deleteByIdAndRecipientRollNumber(notifId, rollNumber);
    }
    public void clearAllNotifications(String rollNumber) {
    notificationRepository.deleteByRecipientRollNumber(rollNumber);
}

    // ✅ auto cleanup — runs every day at midnight
    // deletes notifications older than 7 days
    @Scheduled(cron = "0 0 0 * * *")
    public void cleanupOldNotifications() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(7);
        List<Notification> old = notificationRepository.findByCreatedAtBefore(cutoff);
        if (!old.isEmpty()) {
            notificationRepository.deleteAll(old);
            System.out.println("Cleaned up " + old.size() + " old notifications");
        }
    }
}