package com.example.PdfBackend.controller;

import com.example.PdfBackend.model.Discussion;
import com.example.PdfBackend.repository.DiscussionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "http://localhost:5175")
public class DiscussionController {

    private final DiscussionRepository repository;

    public DiscussionController(DiscussionRepository repository) {
        this.repository = repository;
    }

    // Get all discussions
    @GetMapping
    public List<Discussion> getAll() {
        return repository.findAll();
    }

    // Create new discussion
    @PostMapping
    public Discussion create(@RequestBody Discussion discussion) {
        return repository.save(discussion);
    }
}
