package com.example.PdfBackend.model;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuzzReply {
    private String id;
    private String content;
    private String createdByName;
    private String createdByRollNumber;
    private String createdByBranch;
    private String createdByYear;
    private LocalDateTime createdAt;
}