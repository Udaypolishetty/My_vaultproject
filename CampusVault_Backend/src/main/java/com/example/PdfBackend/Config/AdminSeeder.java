

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
    private final AdminConfigProperties adminConfigProperties;

    @Override
    public void run(String... args) {
        for (AdminConfigProperties.AdminItem item : adminConfigProperties.getAdmins()) {
            seedOrUpdateAdmin(item);
        }
    }

    private void seedOrUpdateAdmin(AdminConfigProperties.AdminItem item) {
        StudentProfile admin = studentRepository.findByRollNumber(item.getRollNumber()).orElse(null);

        if (admin == null) {
            admin = new StudentProfile();
            admin.setRollNumber(item.getRollNumber());
            admin.setRole(Role.ADMIN);
        }

        admin.setName(item.getName());
        admin.setPassword(passwordEncoder.encode(item.getPassword()));
        admin.setRole(Role.ADMIN);

        studentRepository.save(admin);
        System.out.println("✅ Admin ready → RollNumber: " + item.getRollNumber());
    }
}