package com.example.PdfBackend.Config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "app")
@Data
public class AdminConfigProperties {

    private List<AdminItem> admins = new ArrayList<>();

    @Data
    public static class AdminItem {
        private String name;
        private String rollNumber;
        private String password;
    }
}