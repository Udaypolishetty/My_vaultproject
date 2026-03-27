


package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IdeaRepository extends MongoRepository<Idea, String> {
    boolean existsByTitle(String title);
    boolean existsByCreatedByIdAndCreatedAtBetween(String createdById, LocalDateTime start, LocalDateTime end); // ✅ added

     List<Idea> findTop3ByCreatedByRollNumberOrderByCreatedAtDesc(String rollNumber);
     List<Idea> findByShowcasedTrue();
}