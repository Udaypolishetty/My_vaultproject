package com.example.PdfBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ClubResponse {
    private String id;
    private String title;
    private String description;
    private String linkedinUrl;
    private String createdBy;        // rollNumber
    private String createdByName;    // student name
    private LocalDateTime createdAt;
}