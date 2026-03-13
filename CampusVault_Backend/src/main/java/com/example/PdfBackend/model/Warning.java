package com.example.PdfBackend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    private boolean read = false;

    // for moderator suggestions
    private boolean isSuggestion = false;
    private String suggestedBy;
    private boolean approved = false;

    @JsonProperty("isSuggestion")
private boolean isSuggestion = false;
}