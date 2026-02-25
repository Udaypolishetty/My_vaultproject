package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.RegisterRequest;
import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.StudentProfileRepository;

import com.example.PdfBackend.service.AuthService;
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
                .filter(s -> s.getRole() == Role.STUDENT)
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
}