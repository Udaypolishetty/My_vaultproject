package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.BuzzPostRequest;
import com.example.PdfBackend.DTO.BuzzReplyRequest;
import com.example.PdfBackend.model.BuzzPost;
import com.example.PdfBackend.Service.BuzzService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buzz")
@CrossOrigin
@RequiredArgsConstructor
public class BuzzController {

    private final BuzzService buzzService;

    @GetMapping
public List<BuzzPost> getAll(@AuthenticationPrincipal UserDetails userDetails) {
    return buzzService.getAll(userDetails.getUsername());
}

    @PostMapping("/create")
    public ResponseEntity<BuzzPost> createPost(
            @RequestBody BuzzPostRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(buzzService.createPost(request, userDetails.getUsername()));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<BuzzPost> likePost(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(buzzService.likePost(id, userDetails.getUsername()));
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<BuzzPost> addReply(
            @PathVariable String id,
            @RequestBody BuzzReplyRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(buzzService.addReply(id, request, userDetails.getUsername()));
    }

    @DeleteMapping("/{postId}/reply/{replyId}")
    public ResponseEntity<BuzzPost> deleteReply(
            @PathVariable String postId,
            @PathVariable String replyId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(buzzService.deleteReply(postId, replyId, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        buzzService.deletePost(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
    @PatchMapping("/{id}/resolve")
public ResponseEntity<BuzzPost> resolvePost(
        @PathVariable String id,
        @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(buzzService.resolvePost(id, userDetails.getUsername()));
}
}