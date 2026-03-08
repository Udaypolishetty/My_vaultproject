package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByRecipientRollNumberOrderByCreatedAtDesc(String rollNumber);
    long countByRecipientRollNumberAndIsRead(String rollNumber, boolean isRead);
    List<Notification> findByRecipientRollNumberAndIsRead(String rollNumber, boolean isRead);
    boolean existsByRecipientRollNumberAndMessage(String rollNumber, String message);
    
    // ✅ new — for time-based duplicate check
    boolean existsByRecipientRollNumberAndMessageAndCreatedAtAfter(
        String rollNumber, String message, LocalDateTime after
    );
    // ✅ for manual delete
    void deleteByIdAndRecipientRollNumber(String id, String rollNumber);

    // ✅ for auto cleanup
    List<Notification> findByCreatedAtBefore(LocalDateTime cutoff);
}