package com.example.PdfBackend.Config;

import com.example.PdfBackend.Security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.filter.CorsFilter;   // ✅ NEW IMPORT

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Value("${cors.allowed-origins:http://localhost:5173,https://my-vaultproject.vercel.app}")
    private String allowedOriginsRaw;

    /* ══════════════════════════════════════════════════════
       Shared helper — builds the CorsConfiguration from the
       property value. Used by BOTH beans below so they stay
       in sync with a single source of truth.
    ══════════════════════════════════════════════════════ */
    private CorsConfiguration buildCorsConfig() {
        CorsConfiguration config = new CorsConfiguration();

        List<String> origins = Arrays.stream(allowedOriginsRaw.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();

        config.setAllowedOrigins(origins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        return config;
    }

    /* ══════════════════════════════════════════════════════
       ✅ SERVLET-LEVEL CorsFilter bean.
       This registers at the servlet container level — BEFORE
       Spring Security and BEFORE Railway's edge proxy can
       swallow the preflight. This is the fix for Railway CORS.
    ══════════════════════════════════════════════════════ */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildCorsConfig());
        return new CorsFilter(source);
    }

    /* ══════════════════════════════════════════════════════
       Spring Security CORS source — wired into filterChain.
       Keeps Security's internal CORS handling consistent
       with the servlet-level filter above.
    ══════════════════════════════════════════════════════ */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildCorsConfig());
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.sameOrigin()))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers("/admin.html").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/").permitAll()

                .requestMatchers("/api/auth/**").permitAll()

                .requestMatchers("/student-profile").permitAll()
                .requestMatchers("/student/exists/**").permitAll()
                .requestMatchers("/student/count").permitAll()
                .requestMatchers("/student/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                .requestMatchers("/api/files/view/**").permitAll()
                .requestMatchers("/api/files/download/**").permitAll()

                .requestMatchers(HttpMethod.GET,  "/api/ideas").permitAll()
                .requestMatchers(HttpMethod.GET,  "/api/ideas/leaderboard").permitAll()
                .requestMatchers(HttpMethod.GET,  "/api/ideas/showcase").permitAll()
                .requestMatchers(HttpMethod.GET,  "/api/ideas/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/ideas/create").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH,"/api/ideas/*/status").hasAnyRole("MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH,"/api/ideas/*/edit").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers("/api/ideas/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()

                .requestMatchers(HttpMethod.POST,   "/api/clubs/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH,  "/api/clubs/*/dissolve").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH,  "/api/clubs/*/renew").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH,  "/api/clubs/*/extend-members").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/clubs/*").hasRole("ADMIN")

                .requestMatchers(HttpMethod.PATCH, "/api/clubs/*/assign-role").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.PATCH, "/api/clubs/*/admin-edit").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/admin-remove-member").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/admin-confirm-all").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/admin-confirm-one").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/dev-backdate").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.DELETE, "/api/clubs/*/activities/*").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.PATCH,  "/api/clubs/*/activities/*/admin-complete").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.PATCH,  "/api/clubs/*/activities/*/admin-undo").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.DELETE, "/api/clubs/*/announcements/*").hasAnyRole("ADMIN", "MODERATOR")

                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/join").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/remove-member").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/president-remove-member").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/request-role").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/activities").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/activities/*/vote").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/clubs/*/activities/*/complete").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/announcements").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/clubs/*/announcements/*/pin").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST,  "/api/clubs/*/messages").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.DELETE,"/api/clubs/*/messages/*").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/clubs/*/president-edit").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/clubs/*/set-nickname").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                .requestMatchers("/api/notifications/stream").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/notifications/broadcast-admin").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/notifications/broadcast-mod").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers("/api/notifications/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                .requestMatchers(HttpMethod.GET,    "/api/announcements").permitAll()
                .requestMatchers(HttpMethod.GET,    "/api/announcements/**").permitAll()
                .requestMatchers(HttpMethod.POST,   "/api/announcements/**").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.PUT,    "/api/announcements/**").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers(HttpMethod.PATCH,  "/api/announcements/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/announcements/**").hasAnyRole("ADMIN", "MODERATOR")

                .requestMatchers(HttpMethod.GET,   "/api/buzz").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/buzz/*/resolve").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")
                .requestMatchers("/api/buzz/**").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

                .requestMatchers("/api/warnings/my").authenticated()
                .requestMatchers("/api/warnings/mark-read").authenticated()
                .requestMatchers("/api/warnings/issue").hasRole("ADMIN")
                .requestMatchers("/api/warnings/suggest").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers("/api/warnings/suggestions").hasRole("ADMIN")
                .requestMatchers("/api/warnings/*/approve").hasRole("ADMIN")
                .requestMatchers("/api/warnings/*").hasRole("ADMIN")

                .requestMatchers("/api/students/search").hasAnyRole("ADMIN", "MODERATOR")

                // ✅ Leave club endpoint — must be explicitly permitted for all members
                .requestMatchers(HttpMethod.POST, "/api/clubs/*/leave").hasAnyRole("STUDENT", "MODERATOR", "ADMIN")

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