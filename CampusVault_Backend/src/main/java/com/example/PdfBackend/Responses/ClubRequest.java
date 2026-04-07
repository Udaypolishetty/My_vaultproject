
package com.example.PdfBackend.Responses;

import lombok.Data;

@Data
public class ClubRequest {
    private String title;
    private String description;
    private String category;
    private String logoEmoji;
    private String linkedinUrl;
    private Integer maxMembers; // optional, defaults to 15
}