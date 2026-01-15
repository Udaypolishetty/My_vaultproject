package com.example.PdfBackend.model;

public class Comment {
    private String name;
    private String year;
    private String branch;
    private String text;

    public String getName() { return name; }
    public String getYear() { return year; }
    public String getBranch() { return branch; }
    public String getText() { return text; }

    public void setName(String name) { this.name = name; }
    public void setYear(String year) { this.year = year; }
    public void setBranch(String branch) { this.branch = branch; }
    public void setText(String text) { this.text = text; }
}
