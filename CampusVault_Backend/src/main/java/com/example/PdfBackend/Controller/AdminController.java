package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.RegisterRequest;
import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.StudentProfileRepository;
import com.example.PdfBackend.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final StudentProfileRepository studentRepository;
    private final AuthService authService;

    @GetMapping("/students")
    public ResponseEntity<List<StudentProfile>> getAllStudents() {
        List<StudentProfile> students = studentRepository.findAll()
                .stream()
                .filter(s -> s.getRole() == Role.STUDENT || s.getRole() == Role.MODERATOR)
                .peek(s -> s.setPassword(null))
                .toList();
        return ResponseEntity.ok(students);
    }

    @PostMapping("/students/create")
    public ResponseEntity<?> createStudent(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable String id) {
        studentRepository.deleteById(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    @PatchMapping("/students/{rollNumber}/assign-moderator")
    public ResponseEntity<String> assignModerator(@PathVariable String rollNumber) {
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found: " + rollNumber));
        student.setRole(Role.MODERATOR);
        studentRepository.save(student);
        return ResponseEntity.ok("Moderator assigned successfully");
    }

    @PatchMapping("/students/{rollNumber}/revoke-moderator")
    public ResponseEntity<String> revokeModerator(@PathVariable String rollNumber) {
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found: " + rollNumber));
        student.setRole(Role.STUDENT);
        studentRepository.save(student);
        return ResponseEntity.ok("Moderator revoked successfully");
    }

    @GetMapping("/moderators")
    public ResponseEntity<List<StudentProfile>> getModerators() {
        List<StudentProfile> mods = studentRepository.findAll()
                .stream()
                .filter(s -> s.getRole() == Role.MODERATOR)
                .peek(s -> s.setPassword(null))
                .toList();
        return ResponseEntity.ok(mods);
    }
}