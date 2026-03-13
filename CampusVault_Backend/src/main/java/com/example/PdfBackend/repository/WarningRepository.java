package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Warning;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface WarningRepository extends MongoRepository<Warning, String> {
    List<Warning> findByRecipientRollNumber(String rollNumber);
    // ✅ matches field name 'suggestion' not 'isSuggestion'
    List<Warning> findBySuggestionTrue();
    // ✅ for auto-delete scheduler
    List<Warning> findByCreatedAtBefore(LocalDateTime cutoff);
}