

package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.ClubRequest;
import com.example.PdfBackend.DTO.ClubResponse;
import com.example.PdfBackend.DTO.MemberInfo;
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
    private final NotificationService notificationService;

    public ClubResponse createClub(ClubRequest request, String rollNumber) {
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
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        if (!club.getCreatedBy().equals(rollNumber)) {
            throw new ForbiddenException("You can only delete your own club");
        }

        clubRepository.deleteById(clubId);
    }

    public ClubResponse joinClub(String clubId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        if (club.getCreatedBy().equals(rollNumber)) {
            throw new ForbiddenException("You cannot join your own club");
        }
        if (club.hasMember(rollNumber)) {
            throw new ForbiddenException("You have already joined this club");
        }
        if (club.isFull()) {
            throw new ForbiddenException("This club is full");
        }

        long joinedCount = clubRepository.countByMembersContaining(rollNumber);
        if (joinedCount >= 6) {
            throw new ForbiddenException("You can only join up to 6 clubs");
        }

        club.getMembers().add(rollNumber);
        ClubResponse response = mapToResponse(clubRepository.save(club));

        // ✅ notify club owner
        try {
            StudentProfile joiner = studentRepository.findByRollNumber(rollNumber)
                    .orElse(null);
            if (joiner != null) {
                notificationService.create(
                    club.getCreatedBy(),
                    joiner.getName() + " joined your club \"" + club.getTitle() + "\"",
                    "CLUB_JOIN"
                );
            }
        } catch (Exception e) {
            System.err.println("Notification failed: " + e.getMessage());
        }

        return response;
    }

    public ClubResponse leaveClub(String clubId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        if (!club.hasMember(rollNumber)) {
            throw new ForbiddenException("You are not a member of this club");
        }

        club.getMembers().remove(rollNumber);
        return mapToResponse(clubRepository.save(club));
    }

    public long getClubCount() {
        return clubRepository.count();
    }

    private ClubResponse mapToResponse(Club club) {
        List<MemberInfo> memberDetails = club.getMembers().stream()
                .map(roll -> {
                    StudentProfile student = studentRepository.findByRollNumber(roll).orElse(null);
                    String name   = student != null ? student.getName()   : "Unknown";
                    String year   = student != null ? student.getYear()   : "-";
                    String branch = student != null ? student.getBranch() : "-";
                    String linkedinUrl = clubRepository.findByCreatedBy(roll)
                            .stream().findFirst()
                            .map(Club::getLinkedinUrl).orElse(null);
                    return new MemberInfo(roll, name, year, branch, linkedinUrl);
                })
                .collect(Collectors.toList());

        return new ClubResponse(
                club.getId(),
                club.getTitle(),
                club.getDescription(),
                club.getLinkedinUrl(),
                club.getCreatedBy(),
                club.getCreatedByName(),
                club.getCreatedAt(),
                club.getMembers(),
                memberDetails,
                club.getMembers().size(),
                club.isFull()
        );
    }
}