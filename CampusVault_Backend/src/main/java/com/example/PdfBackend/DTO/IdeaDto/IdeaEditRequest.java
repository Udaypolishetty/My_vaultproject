package com.example.PdfBackend.DTO.IdeaDto;

import lombok.Data;

@Data
public class IdeaEditRequest {
    private String title;
    private String description;
}