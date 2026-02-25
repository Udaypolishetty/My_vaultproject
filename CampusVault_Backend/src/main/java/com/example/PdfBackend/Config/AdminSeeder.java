package com.example.PdfBackend.Config;

import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final StudentProfileRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        String adminRoll = "ADMIN001";

        if (!studentRepository.existsByRollNumber(adminRoll)) {
            StudentProfile admin = new StudentProfile();
            admin.setName("Super Admin");
            admin.setRollNumber(adminRoll);
            admin.setPassword(passwordEncoder.encode("admin@123"));
            admin.setRole(Role.ADMIN);
            studentRepository.save(admin);
            System.out.println("✅ Admin created → RollNumber: ADMIN001 | Password: admin@123");
        }
    }
}