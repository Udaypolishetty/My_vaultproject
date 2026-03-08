// package com.example.PdfBackend;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class PdfBackendApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(PdfBackendApplication.class, args);
// 	}

// }


package com.example.PdfBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // ✅ enables auto cleanup job
public class PdfBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(PdfBackendApplication.class, args);
    }
}