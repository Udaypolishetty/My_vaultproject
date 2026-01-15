package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Discussion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DiscussionRepository extends MongoRepository<Discussion, String> {
}
