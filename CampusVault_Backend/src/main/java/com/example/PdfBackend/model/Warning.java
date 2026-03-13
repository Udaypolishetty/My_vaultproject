package com.example.PdfBackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "warnings")
public class Warning {

    @Id
    private String id;

    private String recipientRollNumber;
    private String recipientName;
    private String message;
    private String severity; // LOW / MEDIUM / HIGH
    private String issuedBy;
    private LocalDateTime issuedAt;

    // ✅ student marks as read to clear badge
    private boolean read = false;

    // ✅ used by scheduler to auto-delete after 7 days
    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ Lombok generates isSuggestion() getter and setSuggestion() setter
    @JsonProperty("isSuggestion")
    private boolean suggestion = false;

    private String suggestedBy;
    private boolean approved = false;
}