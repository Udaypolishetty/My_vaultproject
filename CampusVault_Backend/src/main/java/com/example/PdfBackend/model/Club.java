package com.example.PdfBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Clubs")
public class Club {

    @Id
    private String id;

    private String title;
    private String description;
    private String linkedinUrl;

    // Creator info
    private String createdBy;        // rollNumber
    private String createdByName;    // student name

    // Timestamp
    private LocalDateTime createdAt;
}