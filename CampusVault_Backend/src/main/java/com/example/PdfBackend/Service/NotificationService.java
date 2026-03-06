package com.example.PdfBackend.Service;

import com.example.PdfBackend.model.Notification;
import com.example.PdfBackend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void create(String recipientRollNumber, String message, String type) {
    boolean exists = notificationRepository
        .existsByRecipientRollNumberAndMessage(recipientRollNumber, message);
    if (exists) return;
    Notification notif = new Notification(recipientRollNumber, message, type);
    notificationRepository.save(notif);
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