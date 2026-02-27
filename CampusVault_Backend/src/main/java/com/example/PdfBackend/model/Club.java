package com.example.PdfBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private List<String> members = new ArrayList<>();

    // ✅ Max members allowed (excluding creator)
    private static final int MAX_MEMBERS = 20;

    public boolean isFull() {
        return members.size() >= MAX_MEMBERS;
    }

    public boolean hasMember(String rollNumber) {
        return members.contains(rollNumber);
    }
}