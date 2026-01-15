package com.example.PdfBackend.model;

import org.springframework.beans.factory.annotation.Autowired;

public class StudentProfileResponse {


    private StudentProfile studentProfile;

    private long count;

    public StudentProfileResponse (StudentProfile studentProfile, long count) {
        this.studentProfile = studentProfile;
        this.count = count;
    }

    public StudentProfile getStudentProfile () {
        return studentProfile;
    }
     public long getCount () {
        return count;
     }
}
