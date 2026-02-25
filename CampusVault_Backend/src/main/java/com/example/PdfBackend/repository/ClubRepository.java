package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Club;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClubRepository extends MongoRepository<Club, String> {

    // All clubs by a student
    List<Club> findByCreatedBy(String rollNumber);

    // Prevent same student creating duplicate club title
    boolean existsByTitleAndCreatedBy(String title, String createdBy);

    // Count total clubs
    long countBy();
}