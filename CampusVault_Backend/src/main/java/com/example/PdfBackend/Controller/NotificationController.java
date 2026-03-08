// package com.example.PdfBackend.Controller;

// import com.example.PdfBackend.model.Notification;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import com.example.PdfBackend.Service.NotificationService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/notifications")
// @RequiredArgsConstructor
// public class NotificationController {

//     private final NotificationService notificationService;
//     private final StudentProfileRepository studentRepository;

//     // ✅ Get all notifications for logged in user
//     @GetMapping("/my")
//     public ResponseEntity<List<Notification>> getMyNotifications(Authentication auth) {
//         String rollNumber = auth.getName();
//         return ResponseEntity.ok(notificationService.getAll(rollNumber));
//     }

//     // ✅ Get unread count
//     @GetMapping("/unread-count")
//     public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication auth) {
//         String rollNumber = auth.getName();
//         long count = notificationService.getUnreadCount(rollNumber);
//         return ResponseEntity.ok(Map.of("count", count));
//     }

//     // ✅ Mark all as read
//     @PostMapping("/mark-read")
//     public ResponseEntity<Void> markAllRead(Authentication auth) {
//         String rollNumber = auth.getName();
//         notificationService.markAllRead(rollNumber);
//         return ResponseEntity.ok().build();
//     }
// }



package com.example.PdfBackend.Controller;

import com.example.PdfBackend.Security.JwtUtil;
import com.example.PdfBackend.Service.NotificationService;
import com.example.PdfBackend.model.Notification;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtUtil jwtUtil;

    // ✅ SSE stream — token passed as query param
    @GetMapping("/stream")
    public SseEmitter stream(@RequestParam String token,
                             HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no");

        String rollNumber = jwtUtil.extractRollNumber(token);
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        notificationService.addEmitter(rollNumber, emitter);

        // ✅ heartbeat every 20s to keep connection alive after deployment
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event().name("heartbeat").data("ping"));
            } catch (Exception e) {
                notificationService.removeEmitter(rollNumber);
                scheduler.shutdown();
            }
        }, 20, 20, TimeUnit.SECONDS);

        emitter.onCompletion(() -> {
            notificationService.removeEmitter(rollNumber);
            scheduler.shutdown();
        });
        emitter.onTimeout(() -> {
            notificationService.removeEmitter(rollNumber);
            scheduler.shutdown();
        });

        return emitter;
    }

    @GetMapping("/my")
    public List<Notification> getMyNotifications(Authentication auth) {
        return notificationService.getAll(auth.getName());
    }

    @GetMapping("/unread-count")
    public Map<String, Long> getUnreadCount(Authentication auth) {
        return Map.of("count", notificationService.getUnreadCount(auth.getName()));
    }

    @PostMapping("/mark-read")
    public void markAllRead(Authentication auth) {
        notificationService.markAllRead(auth.getName());
    }
     // ✅ manual delete
    @DeleteMapping("/{id}")
    public void deleteNotification(
            @PathVariable String id,
            Authentication auth) {
        notificationService.deleteNotification(id, auth.getName());
    }
}