package com.example.PdfBackend.Controller;

import com.example.PdfBackend.model.Notification;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.StudentProfileRepository;
import com.example.PdfBackend.Service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final StudentProfileRepository studentRepository;

    // ✅ Get all notifications for logged in user
    @GetMapping("/my")
    public ResponseEntity<List<Notification>> getMyNotifications(Authentication auth) {
        String rollNumber = auth.getName();
        return ResponseEntity.ok(notificationService.getAll(rollNumber));
    }

    // ✅ Get unread count
    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication auth) {
        String rollNumber = auth.getName();
        long count = notificationService.getUnreadCount(rollNumber);
        return ResponseEntity.ok(Map.of("count", count));
    }

    // ✅ Mark all as read
    @PostMapping("/mark-read")
    public ResponseEntity<Void> markAllRead(Authentication auth) {
        String rollNumber = auth.getName();
        notificationService.markAllRead(rollNumber);
        return ResponseEntity.ok().build();
    }
}