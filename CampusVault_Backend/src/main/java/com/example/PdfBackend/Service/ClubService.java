package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.ClubRequest;
import com.example.PdfBackend.DTO.ClubResponse;
import com.example.PdfBackend.model.Club;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.ClubRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final StudentProfileRepository studentRepository;

    public ClubResponse createClub(ClubRequest request, String rollNumber) {

        // ✅ Use NotFoundException
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        if (clubRepository.existsByTitleAndCreatedBy(request.getTitle().trim(), rollNumber)) {
            throw new ForbiddenException("You already have a club with this title");
        }

        Club club = new Club();
        club.setTitle(request.getTitle().trim());
        club.setDescription(request.getDescription().trim());
        club.setLinkedinUrl(request.getLinkedinUrl().trim());
        club.setCreatedBy(rollNumber);
        club.setCreatedByName(student.getName());
        club.setCreatedAt(LocalDateTime.now());

        return mapToResponse(clubRepository.save(club));
    }

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ClubResponse> getMyClubs(String rollNumber) {
        return clubRepository.findByCreatedBy(rollNumber)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteClub(String clubId, String rollNumber) {
        // ✅ Use NotFoundException
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        // ✅ Use ForbiddenException
        if (!club.getCreatedBy().equals(rollNumber)) {
            throw new ForbiddenException("You can only delete your own club");
        }

        clubRepository.deleteById(clubId);
    }

    public long getClubCount() {
        return clubRepository.count();
    }

    private ClubResponse mapToResponse(Club club) {
        return new ClubResponse(
                club.getId(),
                club.getTitle(),
                club.getDescription(),
                club.getLinkedinUrl(),
                club.getCreatedBy(),
                club.getCreatedByName(),
                club.getCreatedAt()
        );
    }
}