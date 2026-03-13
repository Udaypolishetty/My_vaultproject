package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.WarningRequest;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.model.Warning;
import com.example.PdfBackend.repository.StudentProfileRepository;
import com.example.PdfBackend.repository.WarningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WarningService {

    private final WarningRepository warningRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final NotificationService notificationService;

    // ✅ Admin issues warning directly
    public Warning issueWarning(WarningRequest request, String issuerRollNumber) {
        StudentProfile issuer = studentProfileRepository.findByRollNumber(issuerRollNumber)
                .orElseThrow(() -> new NotFoundException("Issuer not found"));

        StudentProfile recipient = studentProfileRepository.findByRollNumber(request.getRecipientRollNumber())
                .orElseThrow(() -> new NotFoundException("Student not found: " + request.getRecipientRollNumber()));

        Warning warning = new Warning();
        warning.setRecipientRollNumber(recipient.getRollNumber());
        warning.setRecipientName(recipient.getName());
        warning.setMessage(request.getMessage());
        warning.setSeverity(request.getSeverity());
        warning.setIssuedBy(issuer.getName());
        warning.setIssuedAt(LocalDateTime.now());
        warning.setCreatedAt(LocalDateTime.now());
        warning.setSuggestion(false);
        warning.setRead(false);

        warningRepository.save(warning);

        // ✅ notify student
        String emoji = switch (request.getSeverity()) {
            case "HIGH"   -> "🚨";
            case "MEDIUM" -> "⚠️";
            default       -> "📢";
        };

        notificationService.create(
            recipient.getRollNumber(),
            emoji + " You have received a " + request.getSeverity() + " warning: " + request.getMessage(),
            "WARNING"
        );

        return warning;
    }

    // ✅ Moderator suggests warning — admin must approve
    public Warning suggestWarning(WarningRequest request, String moderatorRollNumber) {
        StudentProfile moderator = studentProfileRepository.findByRollNumber(moderatorRollNumber)
                .orElseThrow(() -> new NotFoundException("Moderator not found"));

        StudentProfile recipient = studentProfileRepository.findByRollNumber(request.getRecipientRollNumber())
                .orElseThrow(() -> new NotFoundException("Student not found"));

        Warning warning = new Warning();
        warning.setRecipientRollNumber(recipient.getRollNumber());
        warning.setRecipientName(recipient.getName());
        warning.setMessage(request.getMessage());
        warning.setSeverity(request.getSeverity());
        warning.setSuggestion(true);
        warning.setSuggestedBy(moderator.getName());
        warning.setIssuedAt(LocalDateTime.now());
        warning.setCreatedAt(LocalDateTime.now());
        warning.setApproved(false);
        warning.setRead(false);

        return warningRepository.save(warning);
    }

    // ✅ Admin approves moderator suggestion
    public Warning approveWarning(String warningId, String adminRollNumber) {
        StudentProfile admin = studentProfileRepository.findByRollNumber(adminRollNumber)
                .orElseThrow(() -> new NotFoundException("Admin not found"));

        Warning warning = warningRepository.findById(warningId)
                .orElseThrow(() -> new NotFoundException("Warning not found"));

        warning.setApproved(true);
        warning.setSuggestion(false);
        warning.setIssuedBy(admin.getName());
        warningRepository.save(warning);

        String emoji = switch (warning.getSeverity()) {
            case "HIGH"   -> "🚨";
            case "MEDIUM" -> "⚠️";
            default       -> "📢";
        };

        notificationService.create(
            warning.getRecipientRollNumber(),
            emoji + " You have received a " + warning.getSeverity() + " warning: " + warning.getMessage(),
            "WARNING"
        );

        return warning;
    }

    // ✅ Get warnings for a student (only approved/issued, not pending suggestions)
    public List<Warning> getWarningsForStudent(String rollNumber) {
        return warningRepository.findByRecipientRollNumber(rollNumber)
                .stream()
                .filter(w -> !w.isSuggestion())
                .toList();
    }

    // ✅ Mark all warnings as read for a student
    public void markAllRead(String rollNumber) {
        List<Warning> warnings = warningRepository.findByRecipientRollNumber(rollNumber);
        warnings.forEach(w -> w.setRead(true));
        warningRepository.saveAll(warnings);
    }

    // ✅ Get all pending suggestions for admin
    public List<Warning> getPendingSuggestions() {
        return warningRepository.findBySuggestionTrue();
    }

    // ✅ Delete warning
    public void deleteWarning(String warningId) {
        warningRepository.deleteById(warningId);
    }
}