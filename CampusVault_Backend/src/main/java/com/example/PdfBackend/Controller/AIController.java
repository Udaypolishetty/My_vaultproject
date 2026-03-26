package com.example.PdfBackend.Controller;

import com.example.PdfBackend.Security.JwtUtil;
import com.example.PdfBackend.Service.AIService;
import com.example.PdfBackend.model.Club;
import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.repository.ClubRepository;
import com.example.PdfBackend.repository.IdeaRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AIService aiService;

    // 🔥 Rate limit storage (thread-safe)
    private Map<String, Long> lastRequestTime = new ConcurrentHashMap<>();

    @GetMapping("/advisor")
    public ResponseEntity<String> advisor(
            @RequestHeader(value = "Authorization", required = false) String token) {

        // 🔐 Token Safety Check
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid or missing token");
        }

        String roll = jwtUtil.extractRollNumber(token.replace("Bearer ", ""));

        // 🚫 RATE LIMIT (5 minutes per user)
        long now = System.currentTimeMillis();

        if (lastRequestTime.containsKey(roll)) {
            long last = lastRequestTime.get(roll);

            if (now - last < 300000) { // ✅ 5 minutes
                return ResponseEntity.badRequest()
                        .body("⏳ Please wait 5 minutes before requesting again");
            }
        }

        lastRequestTime.put(roll, now);

        // ✅ Fetch limited data
        List<Idea> ideas = ideaRepository
                .findTop3ByCreatedByRollNumberOrderByCreatedAtDesc(roll);

        List<Club> clubs = clubRepository
                .findByMembersContaining(roll);

        // ✅ Get student name (SAFE)
        String name = studentProfileRepository
                .findByRollNumber(roll)
                .map(s -> s.getName())
                .orElse("Student");

        // ✅ Prepare summaries
        String ideaSummary = ideas.isEmpty()
                ? "No ideas submitted"
                : ideas.stream()
                        .map(i -> "- " + i.getTitle())
                        .collect(Collectors.joining("\n"));

        String clubSummary = clubs.isEmpty()
                ? "No clubs joined"
                : clubs.stream()
                        .map(c -> "- " + c.getTitle())
                        .collect(Collectors.joining("\n"));

        // 🤖 FINAL CONTROLLED PROMPT
        String prompt = """
You are a campus AI advisor.

STRICT RULES:
- ONLY use given Ideas and Clubs
- DO NOT suggest external programs, internships, or companies
- DO NOT invent anything outside given data
- Keep response grounded in student activity only

Student Name:
%s

Ideas:
%s

Clubs:
%s

Instructions:
1. Start with: Hi %s
2. Strengths MUST reference ideas or clubs
3. Improvements MUST relate to missing engagement
4. Next actions MUST be inside campus activities only

Output format EXACTLY:

Hi %s 👋

Strengths:
- ...

Improvements:
- ...

Next Actions:
- ...

Keep it short, smart, and relevant.
""".formatted(name, ideaSummary, clubSummary, name, name);

        // 🤖 AI Call with fallback
        String response;
        try {
            response = aiService.getAdvisorResponse(prompt);
        } catch (Exception e) {
            response = "⚠️ Unable to generate advice right now. Try again later.";
        }

        return ResponseEntity.ok(response);
    }
}