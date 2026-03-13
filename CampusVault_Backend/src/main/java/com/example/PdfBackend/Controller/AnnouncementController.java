
package com.example.PdfBackend.Controller;

import com.example.PdfBackend.model.Announcement;
import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.AnnouncementRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;
    private final StudentProfileRepository studentRepository;

    @GetMapping
    public ResponseEntity<List<Announcement>> getAll() {
        List<Announcement> list = announcementRepository.findAll();
        list.sort((a, b) -> {
            if (a.isPinned() && !b.isPinned()) return -1;
            if (!a.isPinned() && b.isPinned()) return 1;
            return Long.compare(b.getTimestamp(), a.getTimestamp());
        });
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Announcement> create(
            @RequestBody Announcement announcement,
            @AuthenticationPrincipal UserDetails userDetails) {

        StudentProfile poster = studentRepository
                .findByRollNumber(userDetails.getUsername())
                .orElse(null);

        announcement.setTimestamp(System.currentTimeMillis());

        if (poster != null && poster.getRole() == Role.MODERATOR) {
            announcement.setPostedBy(poster.getName() + " (Moderator)");
        } else {
            announcement.setPostedBy("Admin");
        }

        return ResponseEntity.ok(announcementRepository.save(announcement));
    }

    // ✅ Edit — admin edits any, moderator edits own only
    @PutMapping("/{id}")
    public ResponseEntity<?> edit(
            @PathVariable String id,
            @RequestBody Announcement updated,
            @AuthenticationPrincipal UserDetails userDetails) {

        Announcement existing = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        StudentProfile requester = studentRepository
                .findByRollNumber(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (requester.getRole() == Role.MODERATOR) {
            String expectedPostedBy = requester.getName() + " (Moderator)";
            if (!expectedPostedBy.equals(existing.getPostedBy())) {
                return ResponseEntity.status(403).body("You can only edit your own announcements");
            }
        }

        existing.setTitle(updated.getTitle());
        existing.setContent(updated.getContent());
        existing.setCategory(updated.getCategory());
        if (updated.getImageUrl() != null) existing.setImageUrl(updated.getImageUrl());

        return ResponseEntity.ok(announcementRepository.save(existing));
    }

    // ✅ Pin/unpin — admin only
    @PatchMapping("/{id}/pin")
    public ResponseEntity<Announcement> togglePin(@PathVariable String id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        announcement.setPinned(!announcement.isPinned());
        return ResponseEntity.ok(announcementRepository.save(announcement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {

        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));

        StudentProfile requester = studentRepository
                .findByRollNumber(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (requester.getRole() == Role.ADMIN) {
            announcementRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        }

        if (requester.getRole() == Role.MODERATOR) {
            String expectedPostedBy = requester.getName() + " (Moderator)";
            if (!expectedPostedBy.equals(announcement.getPostedBy())) {
                return ResponseEntity.status(403).body("You can only delete your own announcements");
            }
            announcementRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        }

        return ResponseEntity.status(403).body("Not authorized");
    }
}