package com.example.PdfBackend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "StudentProfile")
public class StudentProfile {

    @Id
    private String id;
    private String name;
    private String degree;
    @Indexed(unique = true)
    private String rollNumber;
    private String email;
    private String year;
    private String branch;
    private String password;
    private Role role = Role.STUDENT;


}
