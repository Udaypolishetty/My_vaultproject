package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.BuzzPost;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BuzzRepository extends MongoRepository<BuzzPost, String> {
    List<BuzzPost> findAllByOrderByCreatedAtDesc();
    List<BuzzPost> findByExpiresAtBefore(LocalDateTime now);
}