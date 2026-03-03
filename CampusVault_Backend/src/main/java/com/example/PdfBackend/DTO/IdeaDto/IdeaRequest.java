package com.example.PdfBackend.DTO.IdeaDto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class IdeaRequest {

    private String category;
    private String title;
    private String description;
}
