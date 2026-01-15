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

    @GetMapping
    public List<Idea> getAllIdeas() {
        return repo.findAll();
    }

    @PostMapping
    public Idea createIdea(@RequestBody Idea idea) {
        idea.setLikes(0);
        return repo.save(idea);
    }

    @PostMapping("/{id}/like")
    public Idea likeIdea(@PathVariable String id) {
        Idea idea = repo.findById(id).orElseThrow();
        idea.setLikes(idea.getLikes() + 1);
        return repo.save(idea);
    }

    @PostMapping("/{id}/comment")
    public Idea addComment(@PathVariable String id, @RequestBody Comment comment) {
        Idea idea = repo.findById(id).orElseThrow();
        idea.getComments().add(comment);
        return repo.save(idea);
    }
}
