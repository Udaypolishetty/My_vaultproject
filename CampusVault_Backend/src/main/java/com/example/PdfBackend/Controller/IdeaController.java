//package com.example.PdfBackend.Controller;
//
//import com.example.PdfBackend.model.Idea;
//import com.example.PdfBackend.model.Comment;
//import com.example.PdfBackend.repository.IdeaRepository;
//
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//
//@RestController
//@RequestMapping("/api/ideas")
//@CrossOrigin
//public class IdeaController {
//
//    private final IdeaRepository repo;
//
//    public IdeaController(IdeaRepository repo) {
//        this.repo = repo;
//    }
//
//    @GetMapping
//    public List<Idea> getAllIdeas() {
//        return repo.findAll();
//    }
//
//    @PostMapping
//    public Idea createIdea(@RequestBody Idea idea) {
//        idea.setLikes(0);
//        return repo.save(idea);
//    }
//
//    @PostMapping("/{id}/like")
//    public Idea likeIdea(@PathVariable String id) {
//        Idea idea = repo.findById(id).orElseThrow();
//        idea.setLikes(idea.getLikes() + 1);
//        return repo.save(idea);
//    }
//
//    @PostMapping("/{id}/comment")
//    public Idea addComment(@PathVariable String id, @RequestBody Comment comment) {
//        Idea idea = repo.findById(id).orElseThrow();
//        idea.getComments().add(comment);
//        return repo.save(idea);
//    }
//}


package com.example.PdfBackend.controller;

import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.model.Comment;
import com.example.PdfBackend.repository.IdeaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin
public class IdeaController {

    private final IdeaRepository repo;

    public IdeaController(IdeaRepository repo) {
        this.repo = repo;
    }

    // ✅ GET ALL IDEAS
    @GetMapping
    public List<Idea> getAllIdeas() {
        return repo.findAll();
    }

    // ✅ CREATE IDEA
    @PostMapping
    public Idea createIdea(@RequestBody Idea idea) {
        idea.setLikes(0);
        return repo.save(idea);
    }

    // ✅ LIKE IDEA
    @PostMapping("/{id}/like")
    public Idea likeIdea(@PathVariable String id) {
        Idea idea = repo.findById(id).orElseThrow();
        idea.setLikes(idea.getLikes() + 1);
        return repo.save(idea);
    }

    // ✅ ADD COMMENT
    @PostMapping("/{id}/comment")
    public Idea addComment(
            @PathVariable String id,
            @RequestBody Comment comment
    ) {
        Idea idea = repo.findById(id).orElseThrow();
        idea.getComments().add(comment);
        return repo.save(idea);
    }

    // ✅ DELETE COMMENT (BY createdAt)
    @DeleteMapping("/{ideaId}/comment/{createdAt}")
    public Idea deleteComment(
            @PathVariable String ideaId,
            @PathVariable long createdAt
    ) {
        Idea idea = repo.findById(ideaId).orElseThrow();

        idea.getComments().removeIf(
                c -> c.getCreatedAt() == createdAt
        );

        return repo.save(idea);
    }
}