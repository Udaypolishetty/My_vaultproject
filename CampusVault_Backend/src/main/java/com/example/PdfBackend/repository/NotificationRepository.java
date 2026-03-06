package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByRecipientRollNumberOrderByCreatedAtDesc(String rollNumber);
    long countByRecipientRollNumberAndIsRead(String rollNumber, boolean isRead);
    List<Notification> findByRecipientRollNumberAndIsRead(String rollNumber, boolean isRead);
    boolean existsByRecipientRollNumberAndMessage(String rollNumber, String message);
}