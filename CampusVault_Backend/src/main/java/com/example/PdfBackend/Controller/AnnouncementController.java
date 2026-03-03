package com.example.PdfBackend.Controller;

import com.example.PdfBackend.model.Announcement;
import com.example.PdfBackend.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;

    // ✅ Get all — public
    @GetMapping
    public ResponseEntity<List<Announcement>> getAll() {
        List<Announcement> list = announcementRepository.findAll();
        list.sort((a, b) -> Long.compare(b.getTimestamp(), a.getTimestamp()));
        return ResponseEntity.ok(list);
    }

    // ✅ Post — admin only
    @PostMapping
    public ResponseEntity<Announcement> create(@RequestBody Announcement announcement) {
        announcement.setTimestamp(System.currentTimeMillis());
        announcement.setPostedBy("Admin");
        return ResponseEntity.ok(announcementRepository.save(announcement));
    }

    // ✅ Delete — admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        announcementRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}