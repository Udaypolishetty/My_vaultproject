package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.model.StudentProfileResponse;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor   // ← change from @Autowired to this
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;
    private final PasswordEncoder passwordEncoder;  // ← ADD THIS

    public StudentProfileResponse saveProfile(StudentProfile studentProfile) throws IllegalArgumentException {
        String roll = studentProfile.getRollNumber().trim().toUpperCase();

        if (roll.length() < 4 || roll.charAt(2) != 'C' || roll.charAt(3) != '7') {
            throw new IllegalArgumentException("Invalid roll number format");
        }

        if (studentProfileRepository.existsByRollNumber(studentProfile.getRollNumber())) {
            throw new IllegalArgumentException("Roll number already exists");
        }

        // ✅ FIX — set password and role before saving
        studentProfile.setRollNumber(roll); // save as uppercase
        studentProfile.setPassword(passwordEncoder.encode(roll)); // 🔑 password = rollNumber
        studentProfile.setRole(Role.STUDENT);

        StudentProfile saved = studentProfileRepository.save(studentProfile);
        long count = studentProfileRepository.count();

        return new StudentProfileResponse(saved, count);
    }

    public StudentProfile getByRollNumber(String rollNumber) {
        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));
        student.setPassword(null);
        return student;
    }

    public boolean rollNumberExists(String rollNumber) {
        if (rollNumber == null || rollNumber.length() < 4) {
            return false;
        }
        String roll = rollNumber.trim().toUpperCase();
        if (roll.charAt(2) != 'C' || roll.charAt(3) != '7') {
            return false;
        }
        return studentProfileRepository.existsByRollNumber(roll);
    }

    public Optional<StudentProfile> findByRollNumber(String rollNumber) {
        return studentProfileRepository.findByRollNumber(rollNumber);
    }

    public long getStudentCount() {
        return studentProfileRepository.count();
    }
}