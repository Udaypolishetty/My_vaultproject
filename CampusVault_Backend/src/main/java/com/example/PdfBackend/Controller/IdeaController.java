package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.IdeaCommentResponse;
import com.example.PdfBackend.DTO.IdeaDto.IdeaEditRequest;
import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
import com.example.PdfBackend.DTO.CommentDto.CommentRequest;
import com.example.PdfBackend.Service.IdeaService;
import com.example.PdfBackend.Service.CommentService;
import com.example.PdfBackend.model.Idea;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.PdfBackend.DTO.IdeaDto.IdeaStatusRequest;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin
public class IdeaController {

    private final IdeaService ideaService;
    private final CommentService commentService;

    public IdeaController(IdeaService ideaService, CommentService commentService) {
        this.ideaService = ideaService;
        this.commentService = commentService;
    }

    @GetMapping
    public List<IdeaResponse> getAllIdeas() {
        return ideaService.getAllIdeas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable String id) {
        return ideaService.getIdeaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<IdeaResponse> createIdea(
            @RequestBody IdeaRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                ideaService.createIdea(request, userDetails.getUsername())
        );
    }

    // ✅ edit idea — owner only, within 1 hour
    @PatchMapping("/{id}/edit")
    public ResponseEntity<IdeaResponse> editIdea(
            @PathVariable String id,
            @RequestBody IdeaEditRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                ideaService.editIdea(
                        id,
                        request.getTitle(),
                        request.getDescription(),
                        userDetails.getUsername()
                )
        );
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<IdeaResponse> likeIdea(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                ideaService.likeIdea(id, userDetails.getUsername())
        );
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<IdeaCommentResponse> addComment(
            @PathVariable String id,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        request.setIdeaId(id);
        return ResponseEntity.ok(
                commentService.createComment(request, userDetails.getUsername())
        );
    }

    @DeleteMapping("/{ideaId}/comment/{commentId}")
    public ResponseEntity<IdeaCommentResponse> deleteComment(
            @PathVariable String ideaId,
            @PathVariable String commentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                commentService.deleteComment(ideaId, commentId, userDetails.getUsername())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdea(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        ideaService.deleteIdea(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<IdeaResponse> updateStatus(
            @PathVariable String id,
            @RequestBody IdeaStatusRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                ideaService.updateStatus(
                        id,
                        request.getStatus(),
                        request.getModeratorNote(),
                        userDetails.getUsername(),
                        request.getShowcaseImageUrl(),
                        request.getShowcaseLink() // ✅ new
                )
        );
    }
    @GetMapping("/archived")
    @PreAuthorize("hasRole('ADMIN')")
    public List<IdeaResponse> getArchivedIdeas() {
        return ideaService.getArchivedIdeas();
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<Idea>> getLeaderboard() {
        return ResponseEntity.ok(ideaService.getLeaderboard());
    }

    @GetMapping("/showcase")
    public ResponseEntity<List<Idea>> getShowcase() {
        return ResponseEntity.ok(ideaService.getShowcase());
    }
    


}