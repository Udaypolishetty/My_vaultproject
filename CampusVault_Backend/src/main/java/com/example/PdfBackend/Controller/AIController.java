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

    @Autowired private IdeaRepository            ideaRepository;
    @Autowired private ClubRepository            clubRepository;
    @Autowired private StudentProfileRepository  studentProfileRepository;
    @Autowired private JwtUtil                   jwtUtil;
    @Autowired private AIService                 aiService;

    // ── Rate limit: 5 min per user (thread-safe) ──
    private final Map<String, Long> lastRequestTime = new ConcurrentHashMap<>();

    @GetMapping("/advisor")
    public ResponseEntity<String> advisor(
            @RequestHeader(value = "Authorization", required = false) String token) {

        // Auth check
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid or missing token");
        }

        String roll = jwtUtil.extractRollNumber(token.replace("Bearer ", ""));

        // Rate limit: 5 minutes
        long now = System.currentTimeMillis();
        if (lastRequestTime.containsKey(roll)) {
            long elapsed = now - lastRequestTime.get(roll);
            if (elapsed < 300_000) {
                long remainingSec = (300_000 - elapsed) / 1000;
                long m = remainingSec / 60, s = remainingSec % 60;
                return ResponseEntity.badRequest()
                        .body("RATE_LIMIT:" + m + "m " + s + "s");
            }
        }
        lastRequestTime.put(roll, now);

        // ── Fetch student data ──
        String name = studentProfileRepository
                .findByRollNumber(roll)
                .map(s -> s.getName())
                .orElse("Student");

        // Top 5 ideas with likes + status for richer context
        List<Idea> ideas = ideaRepository
                .findTop5ByCreatedByRollNumberOrderByLikesDesc(roll);

        List<Club> clubs = clubRepository
                .findByMembersContaining(roll);

        // ── Build idea summary (title + likes + status) ──
        String ideaSummary = ideas.isEmpty()
                ? "No ideas submitted yet"
                : ideas.stream()
                        .map(i -> "- " + i.getTitle()
                                + " [" + (i.getLikes() != null ? i.getLikes() : 0) + " likes"
                                + ", status: " + (i.getStatus() != null ? i.getStatus() : "pending") + "]")
                        .collect(Collectors.joining("\n"));

        // ── Total likes across all ideas ──
        int totalLikes = ideas.stream()
                .mapToInt(i -> i.getLikes() != null ? i.getLikes() : 0)
                .sum();

        // ── Club summary with role if available ──
        String clubSummary = clubs.isEmpty()
                ? "No clubs joined yet"
                : clubs.stream()
                        .map(c -> "- " + c.getTitle()
                                + (c.getPresidentRoll() != null && c.getPresidentRoll().equals(roll)
                                        ? " [President]"
                                        : " [Member]"))
                        .collect(Collectors.joining("\n"));

        int ideaCount = ideas.size();
        int clubCount = clubs.size();

        // ── Gen-Z style prompt ──
        String prompt = """
You are CampusAI — a Gen-Z AI advisor for college students. You speak like a smart, hype friend who keeps it real. Use casual language, light emoji, short punchy sentences. No corporate talk. No fake positivity. Real talk only.

STRICT RULES:
- ONLY reference the student's actual ideas and clubs given below
- DO NOT mention internships, LinkedIn, external companies, or anything outside campus
- DO NOT invent clubs or ideas not listed
- Keep each bullet point to 1–2 short sentences max

Student: %s (Roll: %s)
Total Ideas: %d | Total Likes Earned: %d
Clubs Joined: %d

Ideas (with likes + status):
%s

Clubs (with role):
%s

Generate a EXACT response in this format — no extra text, no headers outside the format:

Hey %s 👋

Vibe Check:
[One sentence honest vibe about their campus presence so far — keep it real, can be encouraging or a gentle roast depending on their activity]
Score: [X/10]

🔥 What You're Crushing:
- [strength bullet 1]
- [strength bullet 2]
- [strength bullet 3 if warranted]

💡 Room to Level Up:
- [improvement bullet 1]
- [improvement bullet 2]
- [improvement bullet 3 if warranted]

⚡ Your Next Moves:
- [action bullet 1]
- [action bullet 2]
- [action bullet 3]

Keep it punchy. Keep it campus. Keep it real.
""".formatted(name, roll, ideaCount, totalLikes, clubCount,
              ideaSummary, clubSummary, name);

        String response;
        try {
            response = aiService.getAdvisorResponse(prompt);
        } catch (Exception e) {
            e.printStackTrace();
            response = "⚠️ AI is taking a breather rn. Try again in a bit.";
        }

        return ResponseEntity.ok(response);
    }
}