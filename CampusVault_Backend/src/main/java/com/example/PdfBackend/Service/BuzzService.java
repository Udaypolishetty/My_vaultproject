
package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.BuzzPostRequest;
import com.example.PdfBackend.DTO.BuzzReplyRequest;
import com.example.PdfBackend.model.BuzzPost;
import com.example.PdfBackend.model.BuzzReply;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.BuzzRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuzzService {

    private final BuzzRepository buzzRepository;
    private final StudentProfileRepository studentRepository;
    private final NotificationService notificationService; // ✅ added for notifications

    // ✅ filter posts based on student's year and branch
    public List<BuzzPost> getAll(String rollNumber) {
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        String myYear = student.getYear();
        String myBranch = student.getBranch();

        return buzzRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .filter(post -> {
                    switch (post.getVisibility() != null ? post.getVisibility() : "EVERYONE") {
                        case "MY_YEAR":
                            return myYear != null && myYear.equals(post.getCreatedByYear());
                        case "MY_BRANCH":
                            return myBranch != null && myBranch.equals(post.getCreatedByBranch());
                        case "MY_YEAR_BRANCH":
                            return myYear != null && myBranch != null
                                    && myYear.equals(post.getCreatedByYear())
                                    && myBranch.equals(post.getCreatedByBranch());
                        default: // EVERYONE
                            return true;
                    }
                })
                .collect(Collectors.toList());
    }

    public BuzzPost createPost(BuzzPostRequest request, String rollNumber) {
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new ForbiddenException("Content cannot be empty");
        }
        if (request.getContent().length() > 280) {
            throw new ForbiddenException("Content cannot exceed 280 characters");
        }

        BuzzPost post = new BuzzPost();
        post.setContent(request.getContent().trim());
        post.setTag(request.getTag());
        post.setVisibility(request.getVisibility() != null ? request.getVisibility() : "EVERYONE"); // ✅
        post.setCreatedByName(student.getName());
        post.setCreatedByRollNumber(rollNumber);
        post.setCreatedByBranch(student.getBranch());
        post.setCreatedByYear(student.getYear());
        post.setCreatedAt(LocalDateTime.now());
        post.setExpiresAt(LocalDateTime.now().plusDays(3));
        post.setLikes(0);
        post.setLikedBy(new ArrayList<>());
        post.setReplies(new ArrayList<>());

        return buzzRepository.save(post);
    }

    public BuzzPost likePost(String postId, String rollNumber) {
        BuzzPost post = buzzRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found: " + postId));

        if (post.getLikedBy() == null) post.setLikedBy(new ArrayList<>());

        if (post.getLikedBy().contains(rollNumber)) {
            post.getLikedBy().remove(rollNumber);
            post.setLikes(post.getLikes() - 1);
        } else {
            post.getLikedBy().add(rollNumber);
            post.setLikes(post.getLikes() + 1);
        }

        return buzzRepository.save(post);
    }

    public BuzzPost addReply(String postId, BuzzReplyRequest request, String rollNumber) {
        BuzzPost post = buzzRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found: " + postId));

        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        if (post.getReplies() == null) post.setReplies(new ArrayList<>());

        boolean alreadyReplied = post.getReplies().stream()
                .anyMatch(r -> r.getCreatedByRollNumber().equals(rollNumber));
        if (alreadyReplied) {
            throw new ForbiddenException("You have already replied to this post");
        }

        BuzzReply reply = new BuzzReply();
        reply.setId(UUID.randomUUID().toString());
        reply.setContent(request.getContent().trim());
        reply.setCreatedByName(student.getName());
        reply.setCreatedByRollNumber(rollNumber);
        reply.setCreatedByBranch(student.getBranch());
        reply.setCreatedByYear(student.getYear());
        reply.setCreatedAt(LocalDateTime.now());

        post.getReplies().add(reply);
        BuzzPost savedPost = buzzRepository.save(post);

        // ✅ notify post owner when someone replies
        if (!rollNumber.equals(post.getCreatedByRollNumber())) {
            notificationService.create(
                    post.getCreatedByRollNumber(),
                    student.getName() + " replied to your buzz: \"" +
                            post.getContent().substring(0, Math.min(40, post.getContent().length())) + "...\"",
                    "BUZZ_REPLY"
            );
        }

        return savedPost;
    }

    public BuzzPost deleteReply(String postId, String replyId, String rollNumber) {
        BuzzPost post = buzzRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found: " + postId));

        if (post.getReplies() == null) post.setReplies(new ArrayList<>());

        BuzzReply target = post.getReplies().stream()
                .filter(r -> replyId.equals(r.getId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Reply not found: " + replyId));

        if (!rollNumber.equals(target.getCreatedByRollNumber())) {
            throw new ForbiddenException("You can only delete your own replies");
        }

        post.getReplies().remove(target);
        return buzzRepository.save(post);
    }

    public void deletePost(String postId, String rollNumber) {
        BuzzPost post = buzzRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found: " + postId));

        if (!rollNumber.equals(post.getCreatedByRollNumber())) {
            throw new ForbiddenException("You can only delete your own posts");
        }

        buzzRepository.deleteById(postId);
    }

    @Scheduled(cron = "0 0 1 * * *")
    public void cleanupExpiredPosts() {
        List<BuzzPost> expired = buzzRepository.findByExpiresAtBefore(LocalDateTime.now());
        if (!expired.isEmpty()) {
            buzzRepository.deleteAll(expired);
            System.out.println("Cleaned up " + expired.size() + " expired buzz posts");
        }
    }

    public BuzzPost resolvePost(String postId, String rollNumber) {
        BuzzPost post = buzzRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found: " + postId));

        // ✅ only post owner or admin can resolve
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        boolean isOwner = rollNumber.equals(post.getCreatedByRollNumber());
        boolean isAdmin = "ADMIN".equals(student.getRole());

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException("Only the post owner or admin can resolve this post");
        }

        post.setResolved(true);
        post.setResolvedBy(rollNumber);
        return buzzRepository.save(post);
    }
}
