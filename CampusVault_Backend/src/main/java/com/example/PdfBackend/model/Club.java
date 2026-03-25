// package com.example.PdfBackend.model;

// import lombok.*;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import java.time.LocalDateTime;
// import java.util.*;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Document(collection = "Clubs")
// public class Club {

//     @Id
//     private String id;

//     private String title;
//     private String description;
//     private String category;
//     private String logoEmoji;
//     private String linkedinUrl;

//     private String createdBy;
//     private String createdByName;

//     private LocalDateTime createdAt;
//     private LocalDateTime semesterStartDate;
//     private LocalDateTime semesterEndDate;

//     private String status = "ACTIVE";
//     private int maxMembers = 15;

//     private List<String> members = new ArrayList<>();
//     private List<PendingMember> pendingMembers = new ArrayList<>();

//     private String presidentRoll;
//     private String vpRoll;

//     private List<ClubActivity> activities = new ArrayList<>();
//     private List<ClubAnnouncement> announcements = new ArrayList<>();
//     private List<ClubMessage> messages = new ArrayList<>();
//     private List<ClubBadge> badges = new ArrayList<>();
//     private List<RoleRequest> roleRequests = new ArrayList<>();

//     private int editCount = 0;
//     private int extraActivities = 0;

//     private Map<String, String> memberNicknames = new HashMap<>();
//     private Map<String, Integer> dailyAnnouncementCount = new HashMap<>();

//     private boolean thirtyDayWarningSent = false;
//     private boolean sevenDayWarningSent = false;

//     // ─── COMPUTED HELPERS ────────────────────────────────────────────

//     public boolean isFull() {
//         return (members.size() + pendingMembers.size()) >= maxMembers;
//     }

//     public boolean hasMember(String rollNumber) {
//         return members.contains(rollNumber);
//     }

//     public boolean isPending(String rollNumber) {
//         return pendingMembers.stream().anyMatch(p -> p.getRollNumber().equals(rollNumber));
//     }

//     public boolean isAnyMember(String rollNumber) {
//         return hasMember(rollNumber) || isPending(rollNumber);
//     }

//     public int totalJoined() {
//         return members.size() + pendingMembers.size();
//     }

//     // ✅ BUG FIX: only CONFIRMED members count toward activity unlock
//     // Pending members in grace period should NOT unlock activities
//     public boolean isActivityUnlocked() {
//         return members.size() >= (int) Math.ceil(maxMembers * 0.5);
//     }

//     // ✅ get the single current active activity (first incomplete with previous completed)
// public ClubActivity getCurrentActivity() {

//     // 🔒 BLOCK if not unlocked OR no president
//     if (!isActivityUnlocked() || presidentRoll == null) {
//         return null;
//     }

//     for (int i = 0; i < activities.size(); i++) {
//         ClubActivity a = activities.get(i);
//         if (a.isCompleted()) continue;

//         if (i == 0) {
//             return a;
//         }

//         if (activities.get(i - 1).isCompleted()) {
//             return a;
//         }

//         return null;
//     }

//     return null;
// }

//     // ─── INNER CLASSES ───────────────────────────────────────────────

//     @Data @NoArgsConstructor
//     public static class ClubActivity {
//         private String id;
//         private String title;
//         private String description;
//         private String addedBy;
//         private String addedByName;
//         private boolean completed;
//         private boolean extra;
//         private boolean autoSeeded;

//         private String riskLevel;
//         private int minDaysToComplete;
//         private int maxDaysExpected;
//         private LocalDateTime availableFrom;

//         private LocalDateTime completedAt;
//         private LocalDateTime createdAt;
//         private List<String> votes = new ArrayList<>();
//     }

//     @Data @NoArgsConstructor @AllArgsConstructor
//     public static class ClubAnnouncement {
//         private String id;
//         private String title;
//         private String content;
//         private String postedBy;
//         private String postedByName;
//         private boolean pinned;
//         private LocalDateTime createdAt;
//     }

//     @Data @NoArgsConstructor @AllArgsConstructor
//     public static class ClubMessage {
//         private String id;
//         private String content;
//         private String senderRoll;
//         private String senderName;
//         private boolean deleted;
//         private LocalDateTime createdAt;
//     }

//     @Data @NoArgsConstructor @AllArgsConstructor
//     public static class ClubBadge {
//         private String rollNumber;
//         private String name;
//         private String badgeType;
//         private LocalDateTime earnedAt;
//     }

//     @Data @NoArgsConstructor @AllArgsConstructor
//     public static class RoleRequest {
//         private String id;
//         private String requestedBy;
//         private String requestedByName;
//         private String role;
//         private String status;
//         private LocalDateTime createdAt;
//     }

//     @Data @NoArgsConstructor @AllArgsConstructor
//     public static class PendingMember {
//         private String rollNumber;
//         private String name;
//         private LocalDateTime joinedAt;
//     }
// }


package com.example.PdfBackend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Clubs")
public class Club {

    @Id
    private String id;

    private String title;
    private String description;
    private String category;
    private String logoEmoji;
    private String linkedinUrl;

    private String createdBy;
    private String createdByName;

    private LocalDateTime createdAt;
    private LocalDateTime semesterStartDate;
    private LocalDateTime semesterEndDate;

    private String status = "ACTIVE";
    private int maxMembers = 15;

    private List<String> members = new ArrayList<>();
    private List<PendingMember> pendingMembers = new ArrayList<>();

    private String presidentRoll;
    private String vpRoll;

    // ✅ ADD THIS FIELD TO FIX THE COMPILATION ERROR
    private String currentActivityId; 

    private List<ClubActivity> activities = new ArrayList<>();
    private List<ClubAnnouncement> announcements = new ArrayList<>();
    private List<ClubMessage> messages = new ArrayList<>();
    private List<ClubBadge> badges = new ArrayList<>();
    private List<RoleRequest> roleRequests = new ArrayList<>();

    private int editCount = 0;
    private int extraActivities = 0;

    private Map<String, String> memberNicknames = new HashMap<>();
    private Map<String, Integer> dailyAnnouncementCount = new HashMap<>();

    private boolean thirtyDayWarningSent = false;
    private boolean sevenDayWarningSent = false;

    // ─── COMPUTED HELPERS ────────────────────────────────────────────

    public boolean isFull() {
        return (members.size() + pendingMembers.size()) >= maxMembers;
    }

    public boolean hasMember(String rollNumber) {
        return members.contains(rollNumber);
    }

    public boolean isPending(String rollNumber) {
        return pendingMembers.stream().anyMatch(p -> p.getRollNumber().equals(rollNumber));
    }

    public boolean isAnyMember(String rollNumber) {
        return hasMember(rollNumber) || isPending(rollNumber);
    }

    public int totalJoined() {
        return members.size() + pendingMembers.size();
    }

    public boolean isActivityUnlocked() {
        return members.size() >= (int) Math.ceil(maxMembers * 0.5);
    }

    // ✅ REFINED HELPER: Uses the currentActivityId for precision
    public ClubActivity getCurrentActivity() {
        if (currentActivityId == null || activities == null || presidentRoll == null) {
            return null;
        }
        return activities.stream()
                .filter(a -> a.getId().equals(currentActivityId))
                .findFirst()
                .orElse(null);
    }

    // ─── INNER CLASSES ───────────────────────────────────────────────

    @Data @NoArgsConstructor
    public static class ClubActivity {
        private String id;
        private String title;
        private String description;
        private String addedBy;
        private String addedByName;
        private boolean completed;
        private boolean extra;
        private boolean autoSeeded;

        private String riskLevel;
        private int minDaysToComplete;
        private int maxDaysExpected;
        private LocalDateTime availableFrom;

        private LocalDateTime completedAt;
        private LocalDateTime createdAt;
        private List<String> votes = new ArrayList<>();
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ClubAnnouncement {
        private String id;
        private String title;
        private String content;
        private String postedBy;
        private String postedByName;
        private boolean pinned;
        private LocalDateTime createdAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ClubMessage {
        private String id;
        private String content;
        private String senderRoll;
        private String senderName;
        private boolean deleted;
        private LocalDateTime createdAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ClubBadge {
        private String rollNumber;
        private String name;
        private String badgeType;
        private LocalDateTime earnedAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class RoleRequest {
        private String id;
        private String requestedBy;
        private String requestedByName;
        private String role;
        private String status;
        private LocalDateTime createdAt;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class PendingMember {
        private String rollNumber;
        private String name;
        private LocalDateTime joinedAt;
    }
}