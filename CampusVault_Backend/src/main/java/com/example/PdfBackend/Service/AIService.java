// package com.example.PdfBackend.Service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import java.util.*;

// @Service
// public class AIService {

//     @Value("${openrouter.api.key}")
//     private String apiKey;

//     public String getAdvisorResponse(String prompt) {

//         RestTemplate restTemplate = new RestTemplate();

//         String url = "https://openrouter.ai/api/v1/chat/completions";

//         Map<String, Object> body = new HashMap<>();
//         body.put("model", "openai/gpt-3.5-turbo");

//         List<Map<String, String>> messages = new ArrayList<>();
//         Map<String, String> msg = new HashMap<>();
//         msg.put("role", "user");
//         msg.put("content", prompt);

//         messages.add(msg);
//         body.put("messages", messages);

//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.set("Authorization", "Bearer " + apiKey);

//         HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

//         ResponseEntity<Map> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.POST,
//                 entity,
//                 Map.class
//         );

//         List choices = (List) response.getBody().get("choices");
//         Map choice = (Map) choices.get(0);
//         Map message = (Map) choice.get("message");

//         return message.get("content").toString();
//     }
// }



package com.example.PdfBackend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String getAdvisorResponse(String prompt) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://openrouter.ai/api/v1/chat/completions";

        Map<String, Object> body = new HashMap<>();
        // gpt-4o-mini: better quality, still cheap on OpenRouter
        body.put("model", "openai/gpt-4o-mini");
        body.put("max_tokens", 600);   // keep responses tight
        body.put("temperature", 0.75); // slight creativity for Gen-Z tone

        List<Map<String, String>> messages = new ArrayList<>();

        // System message sets tone globally
        Map<String, String> system = new HashMap<>();
        system.put("role", "system");
        system.put("content",
            "You are CampusAI — a Gen-Z campus advisor. " +
            "Speak like a smart, supportive friend. " +
            "Short sentences. Light emoji. Real talk. No corporate jargon. " +
            "Always stay campus-scoped — no external recommendations.");
        messages.add(system);

        Map<String, String> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", prompt);
        messages.add(userMsg);

        body.put("messages", messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("HTTP-Referer", "http://localhost:5173");
        headers.set("X-Title", "Campus AI Advisor");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url, HttpMethod.POST, entity, Map.class);

            Map responseBody = response.getBody();
            if (responseBody == null || !responseBody.containsKey("choices")) {
                throw new RuntimeException("Invalid response from OpenRouter: " + responseBody);
            }

            List choices = (List) responseBody.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("No choices returned from OpenRouter");
            }

            Map choice  = (Map) choices.get(0);
            Map message = (Map) choice.get("message");
            if (message == null || message.get("content") == null) {
                throw new RuntimeException("No message content returned from OpenRouter");
            }

            return message.get("content").toString();

        } catch (HttpStatusCodeException e) {
            throw new RuntimeException(
                "OpenRouter API error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch AI response: " + e.getMessage(), e);
        }
    }
}