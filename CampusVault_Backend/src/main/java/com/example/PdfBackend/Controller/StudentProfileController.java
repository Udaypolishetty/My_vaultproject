package com.example.PdfBackend.Controller;

import com.example.PdfBackend.Service.StudentProfileService;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.model.StudentProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    // ✅ Public — register new student (password auto = rollNumber)
    @PostMapping("/student-profile")
    public ResponseEntity<?> createProfile(@RequestBody StudentProfile studentProfile) {
        try {
            StudentProfileResponse saved = studentProfileService.saveProfile(studentProfile);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 🔒 Protected — only logged in student can view profile
    @GetMapping("/student/{rollNumber}")
    public ResponseEntity<?> getProfile(
            @PathVariable String rollNumber,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            // Student can only view their own profile
            if (!userDetails.getUsername().equals(rollNumber)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You can only view your own profile");
            }
            StudentProfile studentProfile = studentProfileService.getByRollNumber(rollNumber);
            return ResponseEntity.ok(studentProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // 🔒 Protected — check if roll number exists
    @GetMapping("/student/exists/{rollNumber}")
    public ResponseEntity<Boolean> studentExists(@PathVariable String rollNumber) {
        boolean exists = studentProfileService.rollNumberExists(rollNumber);
        return ResponseEntity.ok(exists);
    }

    // 🔒 Protected — get total student count
    @GetMapping("/student/count")
    public ResponseEntity<Long> getCount() {
        long count = studentProfileService.getStudentCount();
        return ResponseEntity.ok(count);
    }
}