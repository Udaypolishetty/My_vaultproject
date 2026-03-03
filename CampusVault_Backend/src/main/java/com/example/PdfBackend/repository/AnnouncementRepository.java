package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnouncementRepository extends MongoRepository<Announcement, String> {
}