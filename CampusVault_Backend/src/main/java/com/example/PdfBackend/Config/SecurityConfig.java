package com.example.PdfBackend.Config;

import com.example.PdfBackend.Security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // ===== AUTH =====
                        .requestMatchers("/api/auth/**").permitAll()

                        // ===== STUDENT =====
                        .requestMatchers("/student-profile").permitAll()
                        .requestMatchers("/student/exists/**").permitAll()
                        .requestMatchers("/student/count").permitAll()
                        .requestMatchers("/student/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                        // ===== FILES =====
                        .requestMatchers("/api/files/view/**").permitAll()
                        .requestMatchers("/api/files/download/**").permitAll()

                        // ===== IDEAS — order matters, specific before general =====
                        .requestMatchers(HttpMethod.GET, "/api/ideas").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/ideas/leaderboard").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/ideas/showcase").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/ideas/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/ideas/create").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/ideas/*/status").hasAnyRole("MODERATOR", "ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/ideas/*/edit").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                        .requestMatchers("/api/ideas/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                        // ===== CLUBS =====
                        .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()
                        .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                        // ===== ADMIN =====
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // ===== NOTIFICATIONS =====
                        .requestMatchers("/api/notifications/stream").permitAll()
                        .requestMatchers("/api/notifications/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                        // ===== ANNOUNCEMENTS =====
                        .requestMatchers(HttpMethod.GET, "/api/announcements").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/announcements/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/announcements/**").hasAnyRole("ADMIN", "MODERATOR")
                        .requestMatchers(HttpMethod.PUT, "/api/announcements/**").hasAnyRole("ADMIN", "MODERATOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/announcements/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/announcements/**").hasAnyRole("ADMIN", "MODERATOR")

                        // ===== BUZZ =====
                        .requestMatchers(HttpMethod.GET, "/api/buzz").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/buzz/*/resolve").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                        .requestMatchers("/api/buzz/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                        // ===== WARNINGS =====
                        .requestMatchers("/api/warnings/my").authenticated()
                        .requestMatchers("/api/warnings/mark-read").authenticated()
                        .requestMatchers("/api/warnings/issue").hasRole("ADMIN")
                        .requestMatchers("/api/warnings/suggest").hasAnyRole("ADMIN", "MODERATOR")
                        .requestMatchers("/api/warnings/suggestions").hasRole("ADMIN")
                        .requestMatchers("/api/warnings/*/approve").hasRole("ADMIN")
                        .requestMatchers("/api/warnings/*").hasRole("ADMIN")

                        // ===== STUDENTS SEARCH =====
                        .requestMatchers("/api/students/search").hasAnyRole("ADMIN", "MODERATOR")

                        // ===== FALLBACK =====
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
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