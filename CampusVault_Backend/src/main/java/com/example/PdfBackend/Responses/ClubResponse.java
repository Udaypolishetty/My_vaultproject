package com.example.PdfBackend.Responses;

import com.example.PdfBackend.DTO.MemberInfo;
import com.example.PdfBackend.model.Club;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class ClubResponse {
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
    private String status;
    private int maxMembers;
    private String currentActivityId;

    private List<String> members;
    private List<Club.PendingMember> pendingMembers;
    private List<MemberInfo> memberDetails;
    private int memberCount;
    private boolean full;
    private boolean activityUnlocked;

    private String presidentRoll;
    private String presidentName;
    private String vpRoll;
    private String vpName;

    private List<Club.ClubActivity> activities;
    private List<Club.ClubAnnouncement> announcements;
    private List<Club.ClubMessage> messages;
    private List<Club.ClubBadge> badges;
    private List<Club.RoleRequest> roleRequests;

    private int completedActivities;
    private int totalActivities;

    // ✅ new restriction fields
    private int editCount;
    private int extraActivities;
    private Map<String, String> memberNicknames;
    private int presidentAnnouncementsToday;
    private int vpAnnouncementsToday;
}