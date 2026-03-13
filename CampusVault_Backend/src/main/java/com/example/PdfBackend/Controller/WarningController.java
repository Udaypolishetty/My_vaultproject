package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.WarningRequest;
import com.example.PdfBackend.Service.WarningService;
import com.example.PdfBackend.model.Warning;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warnings")
@CrossOrigin
@RequiredArgsConstructor
public class WarningController {

    private final WarningService warningService;

    // ✅ Admin issues warning
    @PostMapping("/issue")
    public ResponseEntity<Warning> issueWarning(
            @RequestBody WarningRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            warningService.issueWarning(request, userDetails.getUsername())
        );
    }

    // ✅ Moderator suggests warning
    @PostMapping("/suggest")
    public ResponseEntity<Warning> suggestWarning(
            @RequestBody WarningRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            warningService.suggestWarning(request, userDetails.getUsername())
        );
    }

    // ✅ Admin approves suggestion
    @PostMapping("/{id}/approve")
    public ResponseEntity<Warning> approveWarning(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            warningService.approveWarning(id, userDetails.getUsername())
        );
    }

    // ✅ Get my warnings — student
    @GetMapping("/my")
    public ResponseEntity<List<Warning>> getMyWarnings(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            warningService.getWarningsForStudent(userDetails.getUsername())
        );
    }

    // ✅ Mark all my warnings as read — clears badge
    @PostMapping("/mark-read")
    public ResponseEntity<Void> markAllRead(
            @AuthenticationPrincipal UserDetails userDetails) {
        warningService.markAllRead(userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    // ✅ Get pending suggestions — admin
    @GetMapping("/suggestions")
    public ResponseEntity<List<Warning>> getPendingSuggestions() {
        return ResponseEntity.ok(warningService.getPendingSuggestions());
    }

    // ✅ Delete warning — admin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarning(@PathVariable String id) {
        warningService.deleteWarning(id);
        return ResponseEntity.ok().build();
    }

    // ✅ Get warnings for specific student — admin
    @GetMapping("/student/{rollNumber}")
    public ResponseEntity<List<Warning>> getWarningsForStudent(
            @PathVariable String rollNumber) {
        return ResponseEntity.ok(
            warningService.getWarningsForStudent(rollNumber)
        );
    }
}