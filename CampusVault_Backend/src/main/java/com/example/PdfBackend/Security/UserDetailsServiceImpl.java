package com.example.PdfBackend.Security;

import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final StudentProfileRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String rollNumber) throws UsernameNotFoundException {
        var student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Student not found: " + rollNumber));

        return new User(
                student.getRollNumber(),
                student.getPassword(),
List.of(new SimpleGrantedAuthority("ROLE_" + student.getRole().toString()))     
   );
    }
}