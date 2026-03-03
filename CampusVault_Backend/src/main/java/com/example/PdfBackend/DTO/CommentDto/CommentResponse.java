package com.example.PdfBackend.DTO.CommentDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    private String id;
    private String comment;
    private String commentedBy;
    private String commentedYear;
    private String commentedBranch;
    private LocalDateTime commentedAt;
    private int likes;
    private List<String> likedBy;
    private String ownerRoll; // ✅ needed for frontend ownership check
}