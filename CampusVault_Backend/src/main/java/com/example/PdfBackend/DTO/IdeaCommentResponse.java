package com.example.PdfBackend.DTO;

import com.example.PdfBackend.DTO.CommentDto.CommentResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdeaCommentResponse {
    private String id;                    // idea id
    private List<CommentResponse> comments; // ✅ full updated comment list
    private int likes;
    private List<String> likedBy;
}
