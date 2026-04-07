


package com.example.PdfBackend.DTO.IdeaDto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import com.example.PdfBackend.model.Comment;

@Data
public class IdeaResponse {
    private String id;
    private String category;
    private String title;
    private String description;
    private String createdByName;
    private LocalDateTime createdAt;
    private String createdByBranch;
    private String createdByYear;
    private String createdById;
    private String createdByEmail;
    private int likes;
    private List<String> likedBy;
    private List<Comment> comments;
    private String status;
    private String moderatorNote;
    private String reviewedBy;
    private LocalDateTime reviewedAt;
    private String showcaseImageUrl;
     private String showcaseLink;

    // class proposal
    private boolean classProposal;
    private String proposalClass;
}