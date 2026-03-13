
package com.example.PdfBackend.model;

import lombok.Data;

@Data
public class StudentProfileResponse {

    private StudentProfile studentProfile;
    private long count;

    public StudentProfileResponse(StudentProfile studentProfile, long count) {
        this.studentProfile = studentProfile;
        this.count = count;
    }
}