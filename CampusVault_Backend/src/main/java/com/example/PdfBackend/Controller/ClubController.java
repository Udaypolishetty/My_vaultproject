package com.example.PdfBackend.Controller;

import com.example.PdfBackend.Responses.ClubRequest;
import com.example.PdfBackend.Responses.ClubResponse;
import com.example.PdfBackend.Service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    // ─── ADMIN ──────────────────────────────────────────────────────────────

    @PostMapping("/create")
    public ResponseEntity<ClubResponse> createClub(
            @RequestBody ClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.createClub(request, userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/admin-edit")
    public ResponseEntity<ClubResponse> adminEditClub(
            @PathVariable String clubId,
            @RequestBody ClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.adminEditClub(clubId, request, userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/extend-members")
    public ResponseEntity<ClubResponse> extendMembers(
            @PathVariable String clubId,
            @RequestBody Map<String, Integer> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.extendMembers(
            clubId, body.get("maxMembers"), userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/dissolve")
    public ResponseEntity<ClubResponse> dissolveClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.dissolveClub(clubId, userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/renew")
    public ResponseEntity<ClubResponse> renewSemester(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.renewSemester(clubId, userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/assign-role")
    public ResponseEntity<ClubResponse> assignRole(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.assignRole(
            clubId, body.get("rollNumber"), body.get("role"), userDetails.getUsername()));
    }

    @PostMapping("/{clubId}/admin-remove-member")
    public ResponseEntity<ClubResponse> adminRemoveMember(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.adminRemoveMember(
            clubId, body.get("rollNumber"), userDetails.getUsername()));
    }

    @DeleteMapping("/{clubId}")
    public ResponseEntity<String> deleteClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        clubService.deleteClub(clubId, userDetails.getUsername());
        return ResponseEntity.ok("Club deleted");
    }

    // ─── PUBLIC ─────────────────────────────────────────────────────────────

    @GetMapping("/all")
    public ResponseEntity<List<ClubResponse>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getClubCount() {
        return ResponseEntity.ok(clubService.getClubCount());
    }

    @GetMapping("/{clubId}")
    public ResponseEntity<ClubResponse> getClub(@PathVariable String clubId) {
        return ResponseEntity.ok(clubService.getClub(clubId));
    }

    // ─── MEMBER ─────────────────────────────────────────────────────────────

    @PostMapping("/{clubId}/join")
    public ResponseEntity<ClubResponse> joinClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.joinClub(clubId, userDetails.getUsername()));
    }

    @PostMapping("/{clubId}/president-remove-member")
    public ResponseEntity<ClubResponse> presidentRemoveMember(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.presidentRemoveMember(
            clubId, body.get("rollNumber"), userDetails.getUsername()));
    }

    @PostMapping("/{clubId}/request-role")
    public ResponseEntity<ClubResponse> requestRole(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.requestRole(
            clubId, userDetails.getUsername(), body.get("role")));
    }

    // ─── ACTIVITIES ─────────────────────────────────────────────────────────

    @PostMapping("/{clubId}/activities")
    public ResponseEntity<ClubResponse> addExtraActivity(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.addExtraActivity(
            clubId, body.get("title"), body.get("description"), userDetails.getUsername()));
    }

    @PostMapping("/{clubId}/activities/{activityId}/vote")
    public ResponseEntity<ClubResponse> voteActivity(
            @PathVariable String clubId,
            @PathVariable String activityId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.voteActivity(clubId, activityId, userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/activities/{activityId}/complete")
    public ResponseEntity<ClubResponse> completeActivity(
            @PathVariable String clubId,
            @PathVariable String activityId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.completeActivity(clubId, activityId, userDetails.getUsername()));
    }

    // ─── PRESIDENT EDIT ──────────────────────────────────────────────────────

    @PatchMapping("/{clubId}/president-edit")
    public ResponseEntity<ClubResponse> presidentEditClub(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.presidentEditClub(
            clubId, body.get("description"), userDetails.getUsername()));
    }

    // ─── NICKNAME ────────────────────────────────────────────────────────────

    @PatchMapping("/{clubId}/set-nickname")
    public ResponseEntity<ClubResponse> setNickname(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.setNickname(
            clubId, body.get("rollNumber"), body.get("nickname"), userDetails.getUsername()));
    }

    // ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────

    @PostMapping("/{clubId}/announcements")
    public ResponseEntity<ClubResponse> addAnnouncement(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.addAnnouncement(
            clubId, body.get("title"), body.get("content"), userDetails.getUsername()));
    }

    @PatchMapping("/{clubId}/announcements/{annId}/pin")
    public ResponseEntity<ClubResponse> pinAnnouncement(
            @PathVariable String clubId,
            @PathVariable String annId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.pinAnnouncement(clubId, annId, userDetails.getUsername()));
    }

    // ─── CHAT ────────────────────────────────────────────────────────────────

    @PostMapping("/{clubId}/messages")
    public ResponseEntity<ClubResponse> sendMessage(
            @PathVariable String clubId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.sendMessage(
            clubId, body.get("content"), userDetails.getUsername()));
    }

    @DeleteMapping("/{clubId}/messages/{messageId}")
    public ResponseEntity<ClubResponse> deleteMessage(
            @PathVariable String clubId,
            @PathVariable String messageId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.deleteMessage(
            clubId, messageId, userDetails.getUsername()));
    }


    // ✅ ADD THESE 3 ENDPOINTS TO ClubController.java

@PostMapping("/{clubId}/admin-confirm-all")
public ResponseEntity<ClubResponse> adminConfirmAll(
        @PathVariable String clubId,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(clubService.adminConfirmAll(clubId, userDetails.getUsername()));
}

@DeleteMapping("/{clubId}/activities/{activityId}")
public ResponseEntity<ClubResponse> adminDeleteActivity(
        @PathVariable String clubId,
        @PathVariable String activityId,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(clubService.adminDeleteActivity(clubId, activityId, userDetails.getUsername()));
}

@PatchMapping("/{clubId}/activities/{activityId}/admin-complete")
public ResponseEntity<ClubResponse> adminCompleteActivity(
        @PathVariable String clubId,
        @PathVariable String activityId,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(clubService.adminCompleteActivity(clubId, activityId, userDetails.getUsername()));
}

@PostMapping("/{clubId}/admin-confirm-one")
public ResponseEntity<ClubResponse> adminConfirmOne(
        @PathVariable String clubId,
        @RequestBody Map<String, String> body,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(clubService.adminConfirmOne(
        clubId, body.get("rollNumber"), userDetails.getUsername()));
}

@PatchMapping("/{clubId}/activities/{activityId}/admin-undo")
public ResponseEntity<ClubResponse> adminUndoActivity(
        @PathVariable String clubId,
        @PathVariable String activityId,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(clubService.adminUndoActivity(clubId, activityId, userDetails.getUsername()));
}
 
@DeleteMapping("/{clubId}/announcements/{annId}")
public ResponseEntity<ClubResponse> deleteAnnouncement(
        @PathVariable String clubId,
        @PathVariable String annId,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(clubService.deleteAnnouncement(clubId, annId, userDetails.getUsername()));
}

@PostMapping("/{clubId}/dev-backdate")
public ResponseEntity<String> backdateActivities(
        @PathVariable String clubId,
        @AuthenticationPrincipal UserDetails userDetails) {
    clubService.backdateActivitiesForTesting(clubId, userDetails.getUsername());
    return ResponseEntity.ok("Backdated 15 days for testing");
}
}