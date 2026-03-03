package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.CommentDto.CommentRequest;
import com.example.PdfBackend.DTO.CommentDto.CommentResponse;
import com.example.PdfBackend.DTO.IdeaCommentResponse;
import com.example.PdfBackend.model.Comment;
import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.IdeaRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    private final IdeaRepository ideaRepository;
    private final StudentProfileRepository studentProfileRepository;

    public CommentService(IdeaRepository ideaRepository, StudentProfileRepository studentProfileRepository) {
        this.ideaRepository = ideaRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public List<Comment> getAllIdeas() {
        return ideaRepository.findAll()
                .stream()
                .flatMap(idea -> idea.getComments().stream())
                .toList();
    }

    // ✅ Map Comment model → CommentResponse DTO
    private CommentResponse mapToCommentResponse(Comment c) {
        return new CommentResponse(
                c.getId(),
                c.getComment(),
                c.getCommentedBy(),
                c.getCommentedYear(),
                c.getCommentedBranch(),
                c.getCommentAt(),
                c.getLikes(),
                c.getLikedBy(),
                c.getOwnerRoll()
        );
    }

    // ✅ Map full idea → IdeaCommentResponse DTO
    private IdeaCommentResponse mapToIdeaCommentResponse(Idea idea) {
        List<CommentResponse> commentResponses = idea.getComments() == null
                ? new ArrayList<>()
                : idea.getComments().stream()
                .map(this::mapToCommentResponse)
                .toList();

        return new IdeaCommentResponse(
                idea.getId(),
                commentResponses,
                idea.getLikes(),
                idea.getLikedBy()
        );
    }

    public IdeaCommentResponse createComment(CommentRequest request, String rollNumber) {
        Idea idea = ideaRepository.findById(request.getIdeaId())
                .orElseThrow(() -> new NotFoundException("Idea not found: " + request.getIdeaId()));

        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        if (idea.getComments() == null) idea.setComments(new ArrayList<>());

        // ✅ One comment per student
        boolean alreadyCommented = idea.getComments().stream()
                .anyMatch(c -> c.getOwnerRoll() != null && c.getOwnerRoll().equals(rollNumber));

        if (alreadyCommented) {
            throw new ForbiddenException("You have already commented on this idea");
        }

        // ✅ Build from student profile
        Comment comment = new Comment();
        comment.setComment(request.getComment());
        comment.setCommentedBy(student.getName());
        comment.setCommentedYear(student.getYear());
        comment.setCommentedBranch(student.getBranch());
        comment.setOwnerRoll(rollNumber);

        idea.getComments().add(comment);
        ideaRepository.save(idea);

        return mapToIdeaCommentResponse(idea); // ✅ return full updated idea
    }

    public IdeaCommentResponse deleteComment(String ideaId, String commentId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        if (idea.getComments() == null) idea.setComments(new ArrayList<>());

        Comment target = idea.getComments().stream()
                .filter(c -> commentId.equals(c.getId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Comment not found: " + commentId));

        if (!rollNumber.equals(target.getOwnerRoll())) {
            throw new ForbiddenException("You can only delete your own comments");
        }

        idea.getComments().remove(target);
        ideaRepository.save(idea);

        return mapToIdeaCommentResponse(idea);
    }
}