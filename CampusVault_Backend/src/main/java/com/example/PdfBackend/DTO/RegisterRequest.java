package com.example.PdfBackend.DTO;

import lombok.Data;

@Data
public class RegisterRequest {

    private String name;
    private String degree;
    private String rollNumber;
    private String email;
    private String year;
    private String branch;
}
