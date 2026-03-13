

package com.example.PdfBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String id;
    private String token;
    private String message;
    private String rollNumber;
    private String name;
    private String degree;
    private String branch;
    private String year;
    private String role;
    private String email; // ✅ proper field declaration
}