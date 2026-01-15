package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IdeaRepository extends MongoRepository<Idea, String> {
}
