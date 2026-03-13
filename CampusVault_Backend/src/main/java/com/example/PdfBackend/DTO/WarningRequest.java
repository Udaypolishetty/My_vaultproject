package com.example.PdfBackend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WarningRequest {
    private String recipientRollNumber;
    private String message;
    private String severity;

    @JsonProperty("isSuggestion")
    private boolean isSuggestion;
}