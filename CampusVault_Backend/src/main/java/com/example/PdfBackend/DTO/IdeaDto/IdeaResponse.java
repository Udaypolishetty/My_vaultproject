package com.example.PdfBackend.DTO.IdeaDto;

import com.example.PdfBackend.model.Comment;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class IdeaResponse {

    private String id;
    private String title;
    private String category;
    private String description;
    private LocalDateTime createdAt;
    private String createdByName;
    private String createdByBranch;
    private String createdByYear;
    private int likes;
    private List<String> likedBy;
    private List<Comment> comments;

}
