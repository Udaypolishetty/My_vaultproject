package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Club;
import com.example.PdfBackend.model.StudentClub;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentClubRepository extends MongoRepository<StudentClub, String> {

    boolean existsByStudentIdAndClubId(String studentId, String clubId);

    List<StudentClub> findByStudentId(String studentId);
    List<StudentClub>   findByClubId(String clubId);
    Optional<StudentClub> findByStudentIdAndClubId(String studentId, String clubId);

}
