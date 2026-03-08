package com.example.PdfBackend.DTO;

import lombok.Data;

@Data
public class BuzzPostRequest {
    private String content;
    private String tag;
    private String visibility;
}