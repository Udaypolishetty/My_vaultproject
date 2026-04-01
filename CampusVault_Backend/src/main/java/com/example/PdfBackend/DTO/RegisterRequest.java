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
    private String password;      // ✅ student sets own password at registration
    private String linkedinUrl;   // ✅ required for 4th year, optional otherwise
}
