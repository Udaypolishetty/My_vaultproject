package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Comment;
import com.example.PdfBackend.model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment, String> {

}
