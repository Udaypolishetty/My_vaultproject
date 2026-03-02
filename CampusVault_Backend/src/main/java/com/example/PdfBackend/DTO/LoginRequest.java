package com.example.PdfBackend.DTO;

import lombok.Data;

@Data
public class LoginRequest {

    private String rollNumber;
    private String password; // ✅ add this

}
