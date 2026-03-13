package com.example.PdfBackend.Service;

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
        student.setEmail(request.getEmail());
        student.setPassword(passwordEncoder.encode(request.getRollNumber()));
        student.setRole(Role.STUDENT);

        StudentProfile saved = studentRepository.save(student);

        return new AuthResponse(
                saved.getId(),
                null,
                "Student registered successfully",
                saved.getRollNumber(),
                saved.getName(),
                saved.getDegree(),
                saved.getBranch(),
                saved.getYear(),
                saved.getRole().name(),
                saved.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {
        String password = (request.getPassword() != null && !request.getPassword().isEmpty())
            ? request.getPassword()
            : request.getRollNumber();

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getRollNumber(),
                password
            )
        );

        StudentProfile student = studentRepository.findByRollNumber(request.getRollNumber())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String token = jwtUtil.generateToken(
                student.getRollNumber(),
                student.getRole().name()
        );

        return new AuthResponse(
                student.getId(),
                token,
                "Login successful",
                student.getRollNumber(),
                student.getName(),
                student.getDegree(),
                student.getBranch(),
                student.getYear(),
                student.getRole().name(),
                student.getEmail()
        );
    }
}