package com.example.PdfBackend.Service;

import com.example.PdfBackend.model.Notification;
import com.example.PdfBackend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
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

    // ✅ stores active SSE connections per rollNumber
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void addEmitter(String rollNumber, SseEmitter emitter) {
        emitters.put(rollNumber, emitter);
    }

    public void removeEmitter(String rollNumber) {
        emitters.remove(rollNumber);
    }

    public void create(String recipientRollNumber, String message, String type) {
        // ✅ prevent duplicate within last 1 hour
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        boolean recentExists = notificationRepository
            .existsByRecipientRollNumberAndMessageAndCreatedAtAfter(
                recipientRollNumber, message, oneHourAgo
            );
        if (recentExists) return;

        Notification notif = new Notification(recipientRollNumber, message, type);
        notificationRepository.save(notif);

        // ✅ instant push via SSE
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
}