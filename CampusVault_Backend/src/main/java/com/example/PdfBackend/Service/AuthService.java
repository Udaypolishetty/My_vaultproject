package com.example.PdfBackend.service;

import com.example.PdfBackend.DTO.AuthResponse;
import com.example.PdfBackend.DTO.LoginRequest;
import com.example.PdfBackend.DTO.RegisterRequest;
import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.StudentProfileRepository;
import com.example.PdfBackend.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final StudentProfileRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // ✅ Register — password auto set as rollNumber
    public AuthResponse register(RegisterRequest request) {
        if (studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new RuntimeException("Roll number already registered: " + request.getRollNumber());
        }

        StudentProfile student = new StudentProfile();
        student.setName(request.getName());
        student.setDegree(request.getDegree());
        student.setRollNumber(request.getRollNumber());
        student.setYear(request.getYear());
        student.setBranch(request.getBranch());
        student.setPassword(passwordEncoder.encode(request.getRollNumber())); // 🔑 password = rollNumber
        student.setRole(Role.STUDENT);

        studentRepository.save(student);

        return new AuthResponse(
                null,
                "Student registered successfully",
                student.getRollNumber(),
                student.getName(),
                student.getDegree(),
                student.getBranch(),
                student.getYear(),
                student.getRole().name()
        );
    }

    // ✅ Login — student enters rollNumber only
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getRollNumber(),
                        request.getRollNumber()  // password = rollNumber
                )
        );

        StudentProfile student = studentRepository.findByRollNumber(request.getRollNumber())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String token = jwtUtil.generateToken(
                student.getRollNumber(),
                student.getRole().name()
        );

        return new AuthResponse(
                token,
                "Login successful",
                student.getRollNumber(),
                student.getName(),
                student.getDegree(),
                student.getBranch(),
                student.getYear(),
                student.getRole().name()
        );
    }
}
