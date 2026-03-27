
package com.example.PdfBackend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ideas")
public class Idea {

    @Id
    private String id;
    private String category;
    private String title;
    private String description;
    private String createdByName;
    private LocalDateTime createdAt;
    private String createdByBranch;
    private String createdByYear;
    private String createdById;      // ✅ added
    private String createdByEmail;   // ✅ added
    private int likes = 0;
    private List<String> likedBy = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private String createdByRollNumber;


        // ✅ Phase 1 — Idea status system
    private String status = "OPEN"; // OPEN, UNDER_REVIEW, ON_HOLD, IMPLEMENTED, REJECTED
    private String moderatorNote;   // reason/message from moderator
    private String reviewedBy;      // moderator's name who changed status
    private LocalDateTime reviewedAt; // when status was changed
    private boolean showcased = true;
    private boolean archived = false;
    private LocalDateTime archivedAt;

      private String showcaseImageUrl;
       private String showcaseLink;

      private boolean classProposal = false;
    private String proposalClass; // e.g. "3rd Year CSE" — auto-filled from moderator's profi

}