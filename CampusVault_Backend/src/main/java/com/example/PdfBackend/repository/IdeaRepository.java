//package com.example.PdfBackend.repository;
//
//import com.example.PdfBackend.model.Idea;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//public interface IdeaRepository extends MongoRepository<Idea, String> {
//}


// package com.example.PdfBackend.repository;

// import com.example.PdfBackend.model.Idea;
// import org.springframework.data.mongodb.repository.MongoRepository;

// public interface IdeaRepository extends MongoRepository<Idea, String> {
// }


// package com.example.PdfBackend.repository;

// import com.example.PdfBackend.model.Idea;
// import org.springframework.data.mongodb.repository.MongoRepository;

// import java.util.List;

// public interface IdeaRepository extends MongoRepository<Idea, String> {

//     boolean existsByTitle(String title);
// }

// package com.example.PdfBackend.repository;

// import com.example.PdfBackend.model.Idea;
// import org.springframework.data.mongodb.repository.MongoRepository;

// import java.time.LocalDateTime;

// public interface IdeaRepository extends MongoRepository<Idea, String> {
//     boolean existsByTitle(String title);
//     // ✅ check if student already posted today
//     boolean existsByCreatedByNameAndCreatedAtBetween(String name, LocalDateTime start, LocalDateTime end);
// }



package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;

public interface IdeaRepository extends MongoRepository<Idea, String> {
    boolean existsByTitle(String title);
    boolean existsByCreatedByIdAndCreatedAtBetween(String createdById, LocalDateTime start, LocalDateTime end); // ✅ added
}