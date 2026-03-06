package com.example.PdfBackend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String recipientRollNumber;
    private String message;
    private String type;
    private boolean isRead;
    private LocalDateTime createdAt;

    public Notification(String recipientRollNumber, String message, String type) {
        this.recipientRollNumber = recipientRollNumber;
        this.message = message;
        this.type = type;
        this.isRead = false;
        this.createdAt = LocalDateTime.now();
    }
}