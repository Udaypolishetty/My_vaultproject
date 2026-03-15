

// package com.example.PdfBackend.DTO.IdeaDto;

// import com.example.PdfBackend.model.Comment;
// import lombok.*;

// import java.time.LocalDateTime;
// import java.util.List;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Getter
// @Setter
// public class IdeaResponse {

//     private String id;
//     private String title;
//     private String category;
//     private String description;
//     private LocalDateTime createdAt;
//     private String createdByName;
//     private String createdByBranch;
//     private String createdByYear;
//     private String createdById;      // ✅ add this
//     private String createdByEmail;   // ✅ add this too (needed for email button)
//     private int likes;
//     private List<String> likedBy;
//     private List<Comment> comments;

//     // ✅ Phase 1 — status system
//     private String status;
//     private String moderatorNote;
//     private String reviewedBy;
//     private LocalDateTime reviewedAt;

//     private boolean archived;
//     private LocalDateTime archivedAt;
//     private String showcaseImageUrl;
// }

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

    // ✅ class proposal
    private boolean classProposal;
    private String proposalClass;
}