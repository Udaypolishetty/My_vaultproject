//package com.example.PdfBackend.model;
//
//public class Comment {
//    private String name;
//    private String year;
//    private String branch;
//    private String text;
//
//    public String getName() { return name; }
//    public String getYear() { return year; }
//    public String getBranch() { return branch; }
//    public String getText() { return text; }
//
//    public void setName(String name) { this.name = name; }
//    public void setYear(String year) { this.year = year; }
//    public void setBranch(String branch) { this.branch = branch; }
//    public void setText(String text) { this.text = text; }
//}


package com.example.PdfBackend.model;

import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

public class Comment {

    private String id = UUID.randomUUID().toString();

    private String name;
    private String year;
    private String branch;
    private String text;

    private long createdAt = System.currentTimeMillis();
    private int likes = 0;
    private List<Comment> replies = new ArrayList<>();
    private String ownerRoll; // 👈 roll number


    // ===== GETTERS =====
    public String getId() {
        return id;
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

    public String getText() {
        return text;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public int getLikes() {
        return likes;
    }

    public List<Comment> getReplies() {
        return replies;
    }

    // ===== SETTERS =====
    public void setId(String id) {
        this.id = id;
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

    public void setText(String text) {
        this.text = text;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void setReplies(List<Comment> replies) {
        this.replies = replies;
    }
}