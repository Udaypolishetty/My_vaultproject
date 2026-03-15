// package com.example.PdfBackend.DTO.IdeaDto;

// import lombok.*;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Getter
// @Setter
// public class IdeaRequest {

//     private String category;
//     private String title;
//     private String description;
// }


package com.example.PdfBackend.DTO.IdeaDto;

import lombok.Data;

@Data
public class IdeaRequest {
    private String category;
    private String title;
    private String description;
    private boolean classProposal = false; // ✅ moderator sets this
}