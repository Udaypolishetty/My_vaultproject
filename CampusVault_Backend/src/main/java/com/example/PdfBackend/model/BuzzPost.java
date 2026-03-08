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
@Document(collection = "buzz_posts")
public class BuzzPost {

    @Id
    private String id;

    private String content;       // max 280 chars
    private String tag;           // STUDY_GROUP, LOST_FOUND, OPPORTUNITY, EVENT, GENERAL

    private String visibility; // EVERYONE, MY_YEAR, MY_BRANCH, MY_YEAR_BRANCH


    private String createdByName;
    private String createdByRollNumber;
    private String createdByBranch;
    private String createdByYear;

    private LocalDateTime createdAt;
    private LocalDateTime expiresAt; // ✅ auto-delete after 7 days

    private int likes = 0;
    private List<String> likedBy = new ArrayList<>();
    private List<BuzzReply> replies = new ArrayList<>();

    private boolean resolved = false;
    private String resolvedBy; // roll number who resolved
}