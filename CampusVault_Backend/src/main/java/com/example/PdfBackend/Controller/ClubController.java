package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.ClubRequest;
import com.example.PdfBackend.DTO.ClubResponse;
import com.example.PdfBackend.Service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    // ✅ No try/catch needed — GlobalExceptionHandler handles it
    @PostMapping("/create")
    public ResponseEntity<ClubResponse> createClub(
            @RequestBody ClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.createClub(request, userDetails.getUsername())
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClubResponse>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/my")
    public ResponseEntity<List<ClubResponse>> getMyClubs(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.getMyClubs(userDetails.getUsername())
        );
    }

    @DeleteMapping("/{clubId}")
    public ResponseEntity<String> deleteClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        clubService.deleteClub(clubId, userDetails.getUsername());
        return ResponseEntity.ok("Club deleted successfully");
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getClubCount() {
        return ResponseEntity.ok(clubService.getClubCount());
    }
}