package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Warning;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WarningRepository extends MongoRepository<Warning, String> {
    List<Warning> findByRecipientRollNumber(String rollNumber);
    List<Warning> findByIsSuggestionTrue();
}