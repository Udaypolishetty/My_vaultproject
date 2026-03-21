// package com.example.PdfBackend.Responses;

// public class ClubRequest {

//     private String title;
//     private String description;
//     private String linkedinUrl;
//     private String studentId;

//     public String getTitle() {
//         return title;
//     }

//     public void setTitle(String title) {
//         this.title = title;
//     }

//     public String getDescription() {
//         return description;
//     }

//     public void setDescription(String description) {
//         this.description = description;
//     }

//     public String getLinkedinUrl() {
//         return linkedinUrl;
//     }

//     public void setLinkedinUrl(String linkedinUrl) {
//         this.linkedinUrl = linkedinUrl;
//     }

//     public String getStudentId() {
//         return studentId;
//     }

//     public void setStudentId(String studentId) {
//         this.studentId = studentId;
//     }
// }


package com.example.PdfBackend.Responses;

import lombok.Data;

@Data
public class ClubRequest {
    private String title;
    private String description;
    private String category;
    private String logoEmoji;
    private String linkedinUrl;
    private Integer maxMembers; // optional, defaults to 15
}