package com.example.PdfBackend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "StudentProfile")
public class StudentProfile {

    @Id
    private String id;
    private String name;
    private String degree;
    private String rollNumber;
    private String year;
    private String branch;

    public StudentProfile(String id, String name, String degree, String rollNumber, String year, String branch) {
        this.id = id;
        this.name = name;
        this.degree = degree;
        this.rollNumber = rollNumber;
        this.year = year;
        this.branch = branch;
    }

    public String getId () { return id; }

    public void setId (String id) { this.id = id; }

    public String getName() { return name;}

    public void setName(String name) {
        this.name = name;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}
