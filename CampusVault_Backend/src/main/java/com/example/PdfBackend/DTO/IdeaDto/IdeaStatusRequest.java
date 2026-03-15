package com.example.PdfBackend.DTO.IdeaDto;

import lombok.Data;

@Data
public class IdeaStatusRequest {
    private String status;
    private String moderatorNote;
    private String showcaseImageUrl;
    private String showcaseLink;
}