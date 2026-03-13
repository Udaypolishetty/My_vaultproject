//package com.example.PdfBackend.model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import java.util.List;
//import java.util.ArrayList;
//
//@Document(collection = "ideas")
//public class Idea {
//
//    @Id
//    private String id;
//
//    private String name;
//    private String year;
//    private String branch;
//    private String category;
//    private String title;
//    private String description;
//
//    private int likes = 0;
//    private List<Comment> comments = new ArrayList<>();
//
//
//    // ✅ REQUIRED BY JACKSON
//    public Idea() {}
//
//    // ✅ REQUIRED FOR PROPER MAPPING
//    public Idea(String name, String year, String branch, String category, String title, String description) {
//        this.name = name;
//        this.year = year;
//        this.branch = branch;
//        this.category = category;
//        this.title = title;
//        this.description = description;
//    }
//
//    // ===== GETTERS & SETTERS =====
//
//    public String getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getYear() {
//        return year;
//    }
//
//    public String getBranch() {
//        return branch;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public int getLikes() {
//        return likes;
//    }
//
//    public List<Comment> getComments() {
//        return comments;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public void setYear(String year) {
//        this.year = year;
//    }
//
//    public void setBranch(String branch) {
//        this.branch = branch;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public void setLikes(int likes) {
//        this.likes = likes;
//    }
//
//    public void setComments(List<Comment> comments) {
//        this.comments = comments;
//    }
//}


// package com.example.PdfBackend.model;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import java.util.ArrayList;
// import java.util.List;

// @Document(collection = "ideas")
// public class Idea {

//     @Id
//     private String id;

//     private String name;
//     private String year;
//     private String branch;
//     private String category;
//     private String title;
//     private String description;

//     private int likes = 0;
//     private List<Comment> comments = new ArrayList<>();

//     // ===== GETTERS =====
//     public String getId() {
//         return id;
//     }

//     public String getName() {
//         return name;
//     }

//     public String getYear() {
//         return year;
//     }

//     public String getBranch() {
//         return branch;
//     }

//     public String getCategory() {
//         return category;
//     }

//     public String getTitle() {
//         return title;
//     }

//     public String getDescription() {
//         return description;
//     }

//     public int getLikes() {
//         return likes;
//     }

//     public List<Comment> getComments() {
//         return comments;
//     }

//     // ===== SETTERS =====
//     public void setId(String id) {
//         this.id = id;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public void setYear(String year) {
//         this.year = year;
//     }

//     public void setBranch(String branch) {
//         this.branch = branch;
//     }

//     public void setCategory(String category) {
//         this.category = category;
//     }

//     public void setTitle(String title) {
//         this.title = title;
//     }

//     public void setDescription(String description) {
//         this.description = description;
//     }

//     public void setLikes(int likes) {
//         this.likes = likes;
//     }

//     public void setComments(List<Comment> comments) {
//         this.comments = comments;
//     }
// }

//mallu...

// package com.example.PdfBackend.model;

// import lombok.*;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Getter
// @Setter
// @Document(collection = "ideas")
// public class Idea {

//     @Id
//     private String id;
//     private String category;
//     private String title;
//     private String description;
//     private String createdByName;
//     private LocalDateTime createdAt;
//     private String createdByBranch;
//     private String createdByYear;

//     private int likes = 0;
//     private List<String> likedBy = new ArrayList<>();
//    private List<Comment> comments = new ArrayList<>();


// }

//new mallu...

package com.example.PdfBackend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ideas")
public class Idea {

    @Id
    private String id;
    private String category;
    private String title;
    private String description;
    private String createdByName;
    private LocalDateTime createdAt;
    private String createdByBranch;
    private String createdByYear;
    private String createdById;      // ✅ added
    private String createdByEmail;   // ✅ added
    private int likes = 0;
    private List<String> likedBy = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private String createdByRollNumber;


        // ✅ Phase 1 — Idea status system
    private String status = "OPEN"; // OPEN, UNDER_REVIEW, ON_HOLD, IMPLEMENTED, REJECTED
    private String moderatorNote;   // reason/message from moderator
    private String reviewedBy;      // moderator's name who changed status
    private LocalDateTime reviewedAt; // when status was changed

    private boolean archived = false;
    private LocalDateTime archivedAt;

    

}