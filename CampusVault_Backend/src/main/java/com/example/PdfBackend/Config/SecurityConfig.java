package com.example.PdfBackend.Config;

import com.example.PdfBackend.Security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // ✅ Auth — public
                        .requestMatchers("/api/auth/**").permitAll()

                        // ✅ Student registration — public
                        .requestMatchers("/student-profile").permitAll()

                        // ✅ Check roll number exists — public
                        .requestMatchers("/student/exists/**").permitAll()

                        // ✅ Student count — public
                        .requestMatchers("/student/count").permitAll()

                        // ✅ Clubs — view all & count public, create/delete needs login
                        .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()
                        .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "ADMIN")

                        // ✅ Admin only
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // ✅ Student routes — needs JWT
                        .requestMatchers("/student/**").hasAnyRole("STUDENT", "ADMIN")

                        // ✅ Everything else needs authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}