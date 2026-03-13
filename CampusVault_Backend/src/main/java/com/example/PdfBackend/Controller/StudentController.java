package com.example.PdfBackend.Controller;

import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin
@RequiredArgsConstructor
public class StudentController {

    private final StudentProfileRepository studentRepository;

    // ✅ accessible by MODERATOR and ADMIN — search by rollNumber or name
    @GetMapping("/search")
    public ResponseEntity<?> searchStudent(@RequestParam String q) {
        if (q == null || q.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search query is required");
        }

        List<StudentProfile> all = studentRepository.findAll();

        StudentProfile found = all.stream()
            .filter(s ->
                s.getRollNumber() != null &&
                s.getRollNumber().equalsIgnoreCase(q.trim()) ||
                s.getName() != null &&
                s.getName().toLowerCase().contains(q.trim().toLowerCase())
            )
            .findFirst()
            .orElse(null);

        if (found == null) {
            return ResponseEntity.notFound().build();
        }

        // ✅ never expose password
        found.setPassword(null);
        return ResponseEntity.ok(found);
    }
}