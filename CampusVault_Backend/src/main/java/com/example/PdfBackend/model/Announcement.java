package com.example.PdfBackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "announcements")
public class Announcement {
    @Id
    private String id;
    private String title;
    private String content;
    private String category; // "General", "Event", "Academic", "Notice"
    private String imageUrl; // ✅ added
    private long timestamp;
    private String postedBy;
    private boolean pinned = false; // ✅ new
}