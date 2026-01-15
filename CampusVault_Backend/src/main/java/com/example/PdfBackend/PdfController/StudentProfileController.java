package com.example.PdfBackend.PdfController;

import com.example.PdfBackend.Service.StudentProfileService;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.model.StudentProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentProfileService;

    @PostMapping("/student-profile")
    public ResponseEntity<?> createProfile (@RequestBody StudentProfile studentProfile) {
        try {
            StudentProfileResponse saved = studentProfileService.saveProfile(studentProfile);
            return ResponseEntity.ok(saved);
        }catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{rollNumber}")
    public ResponseEntity<?> getProfile (@PathVariable String rollNumber) {
             try {
                 StudentProfile studentProfile = studentProfileService.getByRollNumber(rollNumber);
                 return ResponseEntity.ok(studentProfile);
             } catch (IllegalArgumentException e) {
                 return ResponseEntity
                         .status(HttpStatus.NOT_FOUND)
                         .body(e.getMessage());
             }
    }
    @GetMapping("/student/exists/{rollNumber}")
    public ResponseEntity<Boolean> studentExists(@PathVariable String rollNumber) {
        boolean exists = studentProfileService.rollNumberExists(rollNumber);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/student/count")
    public ResponseEntity<Long> getCount() {
        long count = studentProfileService.getStudentCount();
        return ResponseEntity.ok(count);
    }



}
