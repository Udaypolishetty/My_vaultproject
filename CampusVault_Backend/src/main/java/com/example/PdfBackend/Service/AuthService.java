// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.DTO.AuthResponse;
// import com.example.PdfBackend.DTO.LoginRequest;
// import com.example.PdfBackend.DTO.RegisterRequest;
// import com.example.PdfBackend.model.Role;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import com.example.PdfBackend.Security.JwtUtil;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class AuthService {

//     private final StudentProfileRepository studentRepository;
//     private final PasswordEncoder passwordEncoder;
//     private final AuthenticationManager authenticationManager;
//     private final JwtUtil jwtUtil;

//     public AuthResponse register(RegisterRequest request) {
//         if (studentRepository.existsByRollNumber(request.getRollNumber())) {
//             throw new RuntimeException("Roll number already registered: " + request.getRollNumber());
//         }

//         StudentProfile student = new StudentProfile();
//         student.setName(request.getName());
//         student.setDegree(request.getDegree());
//         student.setRollNumber(request.getRollNumber());
//         student.setYear(request.getYear());
//         student.setBranch(request.getBranch());
//         student.setEmail(request.getEmail());
//         student.setPassword(passwordEncoder.encode(request.getRollNumber()));
//         student.setRole(Role.STUDENT);

//         StudentProfile saved = studentRepository.save(student);

//         return new AuthResponse(
//                 saved.getId(),
//                 null,
//                 "Student registered successfully",
//                 saved.getRollNumber(),
//                 saved.getName(),
//                 saved.getDegree(),
//                 saved.getBranch(),
//                 saved.getYear(),
//                 saved.getRole().name(),
//                 saved.getEmail()
//         );
//     }

//     public AuthResponse login(LoginRequest request) {
//         String password = (request.getPassword() != null && !request.getPassword().isEmpty())
//             ? request.getPassword()
//             : request.getRollNumber();

//         authenticationManager.authenticate(
//             new UsernamePasswordAuthenticationToken(
//                 request.getRollNumber(),
//                 password
//             )
//         );

//         StudentProfile student = studentRepository.findByRollNumber(request.getRollNumber())
//                 .orElseThrow(() -> new RuntimeException("Student not found"));

//         String token = jwtUtil.generateToken(
//                 student.getRollNumber(),
//                 student.getRole().name()
//         );

//         return new AuthResponse(
//                 student.getId(),
//                 token,
//                 "Login successful",
//                 student.getRollNumber(),
//                 student.getName(),
//                 student.getDegree(),
//                 student.getBranch(),
//                 student.getYear(),
//                 student.getRole().name(),
//                 student.getEmail()
//         );
//     }
// }

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

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        if (request.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }

        StudentProfile student = new StudentProfile();
        student.setName(request.getName());
        student.setDegree(request.getDegree());
        student.setRollNumber(request.getRollNumber());
        student.setYear(request.getYear());
        student.setBranch(request.getBranch());
        student.setEmail(request.getEmail());
        student.setLinkedinUrl(request.getLinkedinUrl() != null ? request.getLinkedinUrl().trim() : "");

        // ✅ Encode the student's chosen password
        student.setPassword(passwordEncoder.encode(request.getPassword().trim()));
        student.setRole(Role.STUDENT);

        StudentProfile saved = studentRepository.save(student);

        // ✅ Generate token immediately after registration so frontend can redirect to login
        // We return NO token here — frontend must login separately after registration
        return new AuthResponse(
                saved.getId(),
                null,          // ✅ no token on register — forces proper login flow
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
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        // ✅ Spring Security authenticates against stored encoded password
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getRollNumber(),
                request.getPassword()
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