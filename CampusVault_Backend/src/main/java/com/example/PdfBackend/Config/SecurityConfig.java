// package com.example.PdfBackend.Config;

// import com.example.PdfBackend.Security.JwtAuthFilter;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final JwtAuthFilter jwtAuthFilter;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//                 .cors(cors -> cors.configure(http))
//                 .csrf(csrf -> csrf.disable())
//                 .sessionManagement(sess -> sess
//                         .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                 .authorizeHttpRequests(auth -> auth

//                         // ✅ Auth — public
//                         .requestMatchers("/api/auth/**").permitAll()

//                         // ✅ Student registration — public
//                         .requestMatchers("/student-profile").permitAll()

//                         // ✅ Check roll number exists — public
//                         .requestMatchers("/student/exists/**").permitAll()

//                         // ✅ Student count — public
//                         .requestMatchers("/student/count").permitAll()

//                         // ✅ Clubs — view all & count public, create/delete needs login
//                         .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
//                         .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()
//                         .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "ADMIN")

//                         // ✅ Admin only
//                         .requestMatchers("/api/admin/**").hasRole("ADMIN")

//                         // ✅ Student routes — needs JWT
//                         .requestMatchers("/student/**").hasAnyRole("STUDENT", "ADMIN")
//                         .requestMatchers("/api/clubs/all").permitAll()
//                         .requestMatchers("/api/clubs/*/join").authenticated()
//                         .requestMatchers("/api/clubs/*/leave").authenticated()
//                         // ✅ Everything else needs authentication
//                         .anyRequest().authenticated()
//                 )
//                 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
//             throws Exception {
//         return config.getAuthenticationManager();
//     }
// }


//claude


// package com.example.PdfBackend.Config;

// import com.example.PdfBackend.Security.JwtAuthFilter;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import java.util.List;

// @Configuration
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final JwtAuthFilter jwtAuthFilter;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//                 .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//                 .csrf(csrf -> csrf.disable())
//                 .sessionManagement(sess -> sess
//                         .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                 .authorizeHttpRequests(auth -> auth
//                         .requestMatchers("/api/auth/**").permitAll()
//                         .requestMatchers("/student-profile").permitAll()
//                         .requestMatchers("/student/exists/**").permitAll()
//                         .requestMatchers("/student/count").permitAll()
//                         // ✅ files — public
//                         .requestMatchers("/api/files/view/**").permitAll()
//                         .requestMatchers("/api/files/download/**").permitAll()
//                         .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
//                         .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()
//                         .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "ADMIN")
//                         .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                         .requestMatchers("/student/**").hasAnyRole("STUDENT", "ADMIN")
//                         .requestMatchers("/api/clubs/*/join").authenticated()
//                         .requestMatchers("/api/clubs/*/leave").authenticated()

//                         .requestMatchers(HttpMethod.GET, "/api/announcements").permitAll()
//                         .requestMatchers(HttpMethod.GET, "/api/announcements/**").permitAll()
//                         .requestMatchers(HttpMethod.POST, "/api/announcements/**").hasRole("ADMIN")
//                         .requestMatchers(HttpMethod.DELETE, "/api/announcements/**").hasRole("ADMIN")
//                         .anyRequest().authenticated()
//                 )
//                 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowedOrigins(List.of("http://localhost:5173"));
//         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         config.setAllowedHeaders(List.of("*"));
//         config.setAllowCredentials(true);

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
//             throws Exception {
//         return config.getAuthenticationManager();
//     }
// }


//mallu.....

// package com.example.PdfBackend.Config;

// import com.example.PdfBackend.Security.JwtAuthFilter;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final JwtAuthFilter jwtAuthFilter;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//                 .cors(cors -> cors.configure(http))
//                 .csrf(AbstractHttpConfigurer::disable)
//                 .sessionManagement(sess -> sess
//                         .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                 .authorizeHttpRequests(auth -> auth
//                         // ✅ Auth — public
//                         .requestMatchers("/api/auth/**").permitAll()

//                         // ✅ Student registration — public
//                         .requestMatchers("/student-profile").permitAll()

//                         // ✅ Check roll number exists — public
//                         .requestMatchers("/student/exists/**").permitAll()

//                         // ✅ Student count — public
//                         .requestMatchers("/student/count").permitAll()

//                         // ✅ Ideas — fully public (community board)
//                         .requestMatchers("/api/ideas/**").permitAll()
// //                        .requestMatchers("/api/comments/**").permitAll()
//                         // ✅ Clubs — view all & count public
//                         .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
//                         .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()

//                         // ✅ Use hasAnyRole so it expects ROLE_STUDENT, ROLE_ADMIN
//                         .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "ADMIN")

//                         // ✅ Admin only
//                         .requestMatchers("/api/admin/**").hasRole("ADMIN")

//                         // ✅ Student routes — needs JWT
//                         .requestMatchers("/student/**").hasAnyRole("STUDENT", "ADMIN")

//                         //announcements
//                         .requestMatchers(HttpMethod.GET, "/api/announcements").permitAll()
//                         .requestMatchers(HttpMethod.GET, "/api/announcements/**").permitAll()
//                         .requestMatchers(HttpMethod.POST, "/api/announcements/**").hasRole("ADMIN")
//                         .requestMatchers(HttpMethod.DELETE, "/api/announcements/**").hasRole("ADMIN")

//                         // ✅ Everything else needs authentication
//                         .anyRequest().authenticated()
//                 )
//                 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
//             throws Exception {
//         return config.getAuthenticationManager();
//     }
// }


//new mallu...

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
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/student-profile").permitAll()
                        .requestMatchers("/student/exists/**").permitAll()
                        .requestMatchers("/student/count").permitAll()
                        .requestMatchers("/api/files/view/**").permitAll()
                        .requestMatchers("/api/files/download/**").permitAll()
                        .requestMatchers("/api/ideas/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/clubs/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/clubs/count").permitAll()
                        .requestMatchers("/api/clubs/**").hasAnyRole("STUDENT", "ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/student/**").hasAnyRole("STUDENT", "ADMIN")
                        .requestMatchers("/api/notifications/**").hasAnyRole("STUDENT", "ADMIN")
                        // ✅ Announcements
                        .requestMatchers(HttpMethod.GET, "/api/announcements").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/announcements/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/announcements/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/announcements/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
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