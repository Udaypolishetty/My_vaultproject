package com.example.PdfBackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "studentsIdea")
public class StudentIdea {

    @Id
    private String roll;   // ✅ roll number = PRIMARY KEY

    private String name;
    private String year;
    private String branch;
    private String degree;

    private long createdAt = System.currentTimeMillis();

    // ===== GETTERS =====
    public String getRoll() {
        return roll;
    }

    public String getName() {
        return name;
    }

    public String getYear() {
        return year;
    }

    public String getBranch() {
        return branch;
    }

    public String getDegree() {
        return degree;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    // ===== SETTERS =====
    public void setRoll(String roll) {
        this.roll = roll;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
}