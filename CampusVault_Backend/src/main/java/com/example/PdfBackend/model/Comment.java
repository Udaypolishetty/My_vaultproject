
package com.example.PdfBackend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private String id;
    private String comment;
    private String commentedBy;
    private String commentedYear;
    private String commentedBranch;
    private LocalDateTime commentAt;
    private String ownerRoll;
    private int likes = 0;
    private List<String> likedBy = new ArrayList<>();
}