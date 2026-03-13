


package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;

public interface IdeaRepository extends MongoRepository<Idea, String> {
    boolean existsByTitle(String title);
    boolean existsByCreatedByIdAndCreatedAtBetween(String createdById, LocalDateTime start, LocalDateTime end); // ✅ added
}