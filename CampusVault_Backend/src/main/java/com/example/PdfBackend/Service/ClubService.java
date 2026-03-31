package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.Responses.ClubRequest;
import com.example.PdfBackend.Responses.ClubResponse;
import com.example.PdfBackend.DTO.MemberInfo;
import com.example.PdfBackend.model.Club;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.ClubRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final StudentProfileRepository studentRepository;
    private final NotificationService notificationService;

    private static final int MAX_EDIT_COUNT          = 3;
    private static final int MAX_EXTRA_ACTIVITIES    = 3;
    private static final int MAX_DAILY_ANNOUNCEMENTS = 2;
    private static final int MAX_CHAT_MESSAGES       = 100;

    // ─── ROLE HELPERS ────────────────────────────────────────────────

    private void ensurePresident(Club club, String roll) {
        if (club.getPresidentRoll() == null || !club.getPresidentRoll().equals(roll)) {
            throw new ForbiddenException("Only president can perform this action");
        }
    }

    private boolean isAdminOrMod(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber)
            .map(s -> { String r = s.getRole() != null ? s.getRole().toString() : "";
                return r.equals("ADMIN") || r.equals("MODERATOR"); }).orElse(false);
    }

    private boolean isAdminOnly(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber)
            .map(s -> s.getRole() != null && s.getRole().toString().equals("ADMIN"))
            .orElse(false);
    }

    // Check if a student is already a leader in any other club
    private void validateSingleLeadership(String rollNumber) {
    List<Club> allClubs = clubRepository.findAll();
    for (Club club : allClubs) {
        if (rollNumber.equals(club.getPresidentRoll())) {
            throw new ForbiddenException("Student is already President of " + club.getTitle());
        }
        if (rollNumber.equals(club.getVpRoll())) {
            throw new ForbiddenException("Student is already VP of " + club.getTitle());
        }
    }
}


    // ─── ACTIVITY SEEDING WITH RISK LEVELS ───────────────────────────

    private List<Club.ClubActivity> seedActivities(String category, String adminRoll, String adminName, LocalDateTime semesterStart) {
        List<Object[]> tasks = getTasksForCategory(category);
        List<Club.ClubActivity> list = new ArrayList<>();

        for (int i = 0; i < tasks.size(); i++) {
            Object[] task = tasks.get(i);
            String title       = (String) task[0];
            String description = (String) task[1];
            String risk        = (String) task[2];

            int minDays = risk.equals("LOW") ? 7 : risk.equals("MEDIUM") ? 10 : 14;
            int maxDays = risk.equals("LOW") ? 14 : risk.equals("MEDIUM") ? 20 : 30;

            Club.ClubActivity a = new Club.ClubActivity();
            a.setId(UUID.randomUUID().toString());
            a.setTitle(title);
            a.setDescription(description);
            a.setAddedBy(adminRoll);
            a.setAddedByName(adminName);
            a.setAutoSeeded(true);
            a.setExtra(false);
            a.setCompleted(false);
            a.setRiskLevel(risk);
            a.setMinDaysToComplete(minDays);
            a.setMaxDaysExpected(maxDays);
            // ✅ Activity availableFrom set to null initially
            a.setAvailableFrom(null);
            a.setCreatedAt(semesterStart);
            a.setVotes(new ArrayList<>());
            list.add(a);
        }

        System.out.println("[ClubService] Seeded " + list.size() + " activities for: " + category);
        return list;
    }

    // ─── TASK DEFINITIONS WITH RISK LEVELS ───────────────────────────

    private List<Object[]> getTasksForCategory(String category) {
        if (category == null) return getDefaultTasks();
        switch (category) {
            case "AI": return List.of(
                new Object[]{"Setup Python & ML Environment", "Install Python, pip, Jupyter Notebook and essential ML libraries", "LOW"},
                new Object[]{"Study Neural Network Basics", "Learn about neurons, layers, activation functions and backpropagation", "LOW"},
                new Object[]{"Implement Linear Regression", "Build and train a linear regression model from scratch", "MEDIUM"},
                new Object[]{"Build a Simple Chatbot", "Create a rule-based chatbot using Python", "MEDIUM"},
                new Object[]{"Explore Datasets on Kaggle", "Find and analyze 3 real-world datasets relevant to your interests", "LOW"},
                new Object[]{"Train an Image Classifier", "Use a CNN to classify images from CIFAR-10 or MNIST", "HIGH"},
                new Object[]{"Study Natural Language Processing", "Learn tokenization, embeddings and basic NLP pipelines", "MEDIUM"},
                new Object[]{"Build a Recommendation System", "Implement a collaborative filtering recommendation engine", "HIGH"},
                new Object[]{"Host a Model Demo Session", "Present your trained model to club members", "LOW"},
                new Object[]{"Kaggle Competition Entry", "Participate in a beginner Kaggle competition as a team", "HIGH"},
                new Object[]{"Study Transformer Architecture", "Deep dive into attention mechanism and BERT/GPT basics", "MEDIUM"},
                new Object[]{"Build a Sentiment Analyzer", "Train a model to classify positive/negative reviews", "MEDIUM"},
                new Object[]{"Conduct AI Ethics Discussion", "Discuss bias, fairness and responsible AI in a group session", "LOW"},
                new Object[]{"Deploy a Model to Cloud", "Deploy your ML model using Hugging Face Spaces or Render", "HIGH"},
                new Object[]{"End of Semester Project Demo", "Present final AI project to the entire club", "MEDIUM"}
            );
            case "WEB_DEV": return List.of(
                new Object[]{"HTML & CSS Fundamentals", "Build a static webpage with proper semantic HTML and CSS", "LOW"},
                new Object[]{"JavaScript Basics Workshop", "Learn variables, functions, DOM manipulation and events", "LOW"},
                new Object[]{"Build a Portfolio Website", "Create a personal portfolio site and host it on GitHub Pages", "MEDIUM"},
                new Object[]{"Learn React Fundamentals", "Study components, props, state and hooks", "MEDIUM"},
                new Object[]{"Build a Todo App with React", "Create a fully functional todo app with CRUD operations", "MEDIUM"},
                new Object[]{"REST API Basics", "Learn HTTP methods, status codes and how to consume APIs", "LOW"},
                new Object[]{"Build a Weather App", "Consume a public weather API and display data beautifully", "MEDIUM"},
                new Object[]{"Database Basics with MongoDB", "Learn collections, documents, CRUD in MongoDB", "LOW"},
                new Object[]{"Build a Full Stack App", "Create a simple full stack app with React + Node/Spring", "HIGH"},
                new Object[]{"Learn Git & GitHub", "Master branching, pull requests and collaborative workflows", "LOW"},
                new Object[]{"Responsive Design Workshop", "Make websites look great on all screen sizes using Tailwind", "LOW"},
                new Object[]{"Authentication Implementation", "Add login/register with JWT to your full stack project", "HIGH"},
                new Object[]{"Deploy to Production", "Deploy frontend to Vercel and backend to Render", "HIGH"},
                new Object[]{"Code Review Session", "Review each other's code and give constructive feedback", "LOW"},
                new Object[]{"End of Semester Project Demo", "Present complete web project to the club", "MEDIUM"}
            );
            case "ROBOTICS": return List.of(
                new Object[]{"Introduction to Arduino", "Setup Arduino IDE and blink an LED", "LOW"},
                new Object[]{"Learn Basic Electronics", "Study resistors, capacitors, transistors and circuits", "LOW"},
                new Object[]{"Build a Line Follower Robot", "Assemble and program a basic line follower", "HIGH"},
                new Object[]{"Servo Motor Control", "Control servo motors using Arduino PWM signals", "MEDIUM"},
                new Object[]{"Ultrasonic Sensor Project", "Build an obstacle avoiding robot using HC-SR04", "MEDIUM"},
                new Object[]{"Introduction to Raspberry Pi", "Setup Raspberry Pi and run basic Python scripts", "LOW"},
                new Object[]{"Wireless Control via Bluetooth", "Control a robot via Bluetooth from a mobile phone", "MEDIUM"},
                new Object[]{"3D Print a Robot Part", "Design and 3D print a mechanical component for your robot", "HIGH"},
                new Object[]{"Computer Vision Basics", "Use OpenCV to detect objects with a camera", "HIGH"},
                new Object[]{"Robot Arm Assembly", "Build and program a basic robotic arm", "HIGH"},
                new Object[]{"Autonomous Navigation", "Program a robot to navigate a maze autonomously", "HIGH"},
                new Object[]{"ROS Introduction", "Install Robot Operating System and run a basic simulation", "MEDIUM"},
                new Object[]{"Inter-Club Demo Day", "Showcase robot to students from other clubs", "LOW"},
                new Object[]{"Competitive Robotics Practice", "Prepare for inter-college robotics competition", "HIGH"},
                new Object[]{"End of Semester Project Demo", "Present final robotics project to the club", "MEDIUM"}
            );
            case "ENTREPRENEURSHIP": return List.of(
                new Object[]{"Ideation Workshop", "Generate 10 startup ideas and evaluate feasibility", "LOW"},
                new Object[]{"Market Research Basics", "Learn how to research target market and competitors", "MEDIUM"},
                new Object[]{"Build a Business Model Canvas", "Create a BMC for your top startup idea", "MEDIUM"},
                new Object[]{"Financial Modeling Basics", "Learn revenue models, unit economics and projections", "MEDIUM"},
                new Object[]{"Startup Pitch Practice", "Prepare and deliver a 3-minute elevator pitch", "LOW"},
                new Object[]{"Guest Speaker Session", "Invite a local entrepreneur to share their journey", "LOW"},
                new Object[]{"Build an MVP", "Create a minimum viable product for your idea", "HIGH"},
                new Object[]{"User Interview Practice", "Conduct 5 user interviews and summarize insights", "MEDIUM"},
                new Object[]{"Legal Basics for Startups", "Study company registration, IP and contracts basics", "LOW"},
                new Object[]{"Fundraising & Investors", "Learn about angel investors, VCs and startup funding", "LOW"},
                new Object[]{"Growth Hacking Workshop", "Study customer acquisition and retention strategies", "MEDIUM"},
                new Object[]{"Social Media Marketing", "Build a social media presence for your startup idea", "MEDIUM"},
                new Object[]{"Pitch Competition Prep", "Prepare for inter-college startup pitch competition", "HIGH"},
                new Object[]{"Networking Event", "Attend or organize a networking event with industry people", "MEDIUM"},
                new Object[]{"End of Semester Demo Day", "Present startup progress to club and invited guests", "HIGH"}
            );
            case "SPORTS": return List.of(
                new Object[]{"Fitness Assessment", "Conduct baseline fitness test for all members", "LOW"},
                new Object[]{"Team Selection Trials", "Organize trials and finalize team composition", "MEDIUM"},
                new Object[]{"Strength Training Workshop", "Learn proper form for squats, deadlifts and bench press", "LOW"},
                new Object[]{"Cardio & Endurance Training", "Complete a 5K run and track improvement over semester", "MEDIUM"},
                new Object[]{"Sport-Specific Skills Session", "Practice fundamental skills of the club's primary sport", "MEDIUM"},
                new Object[]{"Nutrition & Diet Workshop", "Learn about sports nutrition and meal planning", "LOW"},
                new Object[]{"First Aid Training", "Learn basic first aid for sports injuries", "LOW"},
                new Object[]{"Friendly Match vs Another Club", "Organize an internal friendly match or tournament", "HIGH"},
                new Object[]{"Mental Fitness Session", "Study sports psychology and performance mindset", "LOW"},
                new Object[]{"Video Analysis Session", "Watch and analyze professional game footage", "LOW"},
                new Object[]{"Agility & Speed Training", "Complete ladder drills and sprint interval sessions", "MEDIUM"},
                new Object[]{"Recovery & Injury Prevention", "Learn stretching routines and injury prevention", "LOW"},
                new Object[]{"Inter-Department Tournament", "Participate in college inter-department tournament", "HIGH"},
                new Object[]{"Coach Feedback Session", "Get feedback from college coach or external trainer", "MEDIUM"},
                new Object[]{"End of Semester Championship", "Organize end-of-semester championship match", "HIGH"}
            );
            case "CULTURAL": return List.of(
                new Object[]{"Introduction & Ice Breaker", "Welcome session with fun cultural exchange activities", "LOW"},
                new Object[]{"Traditional Dance Workshop", "Learn steps of a traditional dance from your culture", "MEDIUM"},
                new Object[]{"Music Appreciation Session", "Explore different genres and instruments from world music", "LOW"},
                new Object[]{"Art Exhibition Planning", "Plan and organize a mini art exhibition", "MEDIUM"},
                new Object[]{"Drama & Acting Workshop", "Participate in a short acting and improv session", "MEDIUM"},
                new Object[]{"Photography Walk", "Go on a campus photography walk and share best shots", "LOW"},
                new Object[]{"Cultural Food Festival", "Organize a small food festival with dishes from different regions", "HIGH"},
                new Object[]{"Poetry & Literature Night", "Share original poems, stories or literary works", "LOW"},
                new Object[]{"Rangoli & Art Workshop", "Create rangoli or traditional art as a group", "LOW"},
                new Object[]{"Short Film Making", "Write, shoot and edit a short 3-minute film", "HIGH"},
                new Object[]{"Guest Artist Session", "Invite a local artist, musician or performer", "MEDIUM"},
                new Object[]{"Flash Mob Practice", "Choreograph and practice a flash mob performance", "HIGH"},
                new Object[]{"Inter-College Cultural Fest Prep", "Prepare entries for inter-college cultural competition", "HIGH"},
                new Object[]{"Cultural Documentary Screening", "Watch and discuss a cultural documentary together", "LOW"},
                new Object[]{"End of Semester Showcase", "Present all semester work in a grand showcase event", "HIGH"}
            );
            case "TOASTMASTERS": return List.of(
                new Object[]{"Ice Breaker Speeches", "Every member delivers a 4-6 minute introductory speech", "LOW"},
                new Object[]{"Table Topics Practice", "Impromptu 1-2 minute speeches on random topics", "LOW"},
                new Object[]{"Prepared Speech Session", "Deliver a 5-7 minute speech on a chosen topic", "MEDIUM"},
                new Object[]{"Evaluation Workshop", "Learn how to give constructive speech evaluations", "LOW"},
                new Object[]{"Body Language & Gestures", "Study and practice effective non-verbal communication", "LOW"},
                new Object[]{"Storytelling Workshop", "Learn narrative structure and deliver a story speech", "MEDIUM"},
                new Object[]{"Debate Session", "Organize a formal debate on a current affairs topic", "MEDIUM"},
                new Object[]{"Persuasive Speaking", "Prepare and deliver a persuasive speech", "MEDIUM"},
                new Object[]{"Humorous Speech Contest", "Internal contest for funniest speech", "LOW"},
                new Object[]{"Business Presentation Skills", "Practice presenting data and reports professionally", "MEDIUM"},
                new Object[]{"Interview Skills Workshop", "Mock interview practice with feedback", "MEDIUM"},
                new Object[]{"Public Speaking Fear Session", "Exercises to overcome stage fright", "LOW"},
                new Object[]{"Inter-Club Speech Contest", "Compete with other college Toastmasters clubs", "HIGH"},
                new Object[]{"Leadership & Facilitation", "Learn how to run meetings and facilitate discussions", "MEDIUM"},
                new Object[]{"End of Semester Gala", "Grand speech event with awards ceremony", "HIGH"}
            );
            case "PHOTOGRAPHY": return List.of(
                new Object[]{"Camera Basics Workshop", "Learn aperture, shutter speed, ISO and white balance", "LOW"},
                new Object[]{"Composition Rules", "Study rule of thirds, leading lines and framing", "LOW"},
                new Object[]{"Portrait Photography Session", "Practice portrait photography with natural light", "MEDIUM"},
                new Object[]{"Landscape Photography Walk", "Campus landscape photography walk and critique", "MEDIUM"},
                new Object[]{"Street Photography Project", "Capture candid street moments around campus", "MEDIUM"},
                new Object[]{"Lightroom Editing Basics", "Learn basic photo editing and color grading", "LOW"},
                new Object[]{"Night Photography Session", "Practice long exposure and night photography", "HIGH"},
                new Object[]{"Photo Story Project", "Create a 10-photo story on a chosen theme", "HIGH"},
                new Object[]{"Product Photography Workshop", "Learn studio-style product photography", "MEDIUM"},
                new Object[]{"Mobile Photography Tips", "Master smartphone photography techniques", "LOW"},
                new Object[]{"Photo Exhibition Planning", "Curate and plan an end-of-semester exhibition", "HIGH"},
                new Object[]{"Interview a Subject", "Conduct an environmental portrait interview session", "MEDIUM"},
                new Object[]{"Drone Photography Basics", "Introduction to aerial photography concepts", "MEDIUM"},
                new Object[]{"Photo Contest", "Internal photo contest with voting by all members", "LOW"},
                new Object[]{"End of Semester Exhibition", "Display best semester work in a photo exhibition", "HIGH"}
            );
            case "TECH_FEST": return List.of(
                new Object[]{"Event Planning Kickoff", "Define fest theme, events list and timeline", "MEDIUM"},
                new Object[]{"Sponsorship Outreach", "Identify and contact potential sponsors", "HIGH"},
                new Object[]{"Marketing & Posters", "Design and distribute event promotional material", "MEDIUM"},
                new Object[]{"Registration System Setup", "Build or configure online registration for events", "HIGH"},
                new Object[]{"Venue & Logistics Planning", "Book venues, arrange seating and logistics", "HIGH"},
                new Object[]{"Hackathon Organization", "Plan and organize the fest's main hackathon", "HIGH"},
                new Object[]{"Technical Events Coordination", "Coordinate coding, quiz and debugging events", "MEDIUM"},
                new Object[]{"Non-Technical Events Setup", "Plan gaming, art and cultural tech events", "MEDIUM"},
                new Object[]{"Guest Speaker Coordination", "Invite and coordinate industry guest speakers", "HIGH"},
                new Object[]{"Volunteer Management", "Recruit and assign volunteers for each event", "MEDIUM"},
                new Object[]{"Social Media Campaign", "Run social media countdown and live coverage", "MEDIUM"},
                new Object[]{"Dry Run & Rehearsal", "Conduct full dry run of all fest events", "HIGH"},
                new Object[]{"Prize & Certificate Arrangement", "Arrange prizes, trophies and certificates", "LOW"},
                new Object[]{"Live Coverage During Fest", "Manage live updates and documentation during fest", "HIGH"},
                new Object[]{"Post-Fest Wrap Up", "Collect feedback, document learnings and close fest", "LOW"}
            );
            case "3D_PRINTING": return List.of(
                new Object[]{"3D Printing Basics", "Learn FDM printing process, materials and settings", "LOW"},
                new Object[]{"CAD Software Introduction", "Get started with Fusion 360 or TinkerCAD", "LOW"},
                new Object[]{"Design a Simple Object", "Design and print a basic geometric object", "MEDIUM"},
                new Object[]{"Slicing Software Workshop", "Learn Cura slicer settings for optimal prints", "LOW"},
                new Object[]{"Print Quality Troubleshooting", "Identify and fix common print failures", "MEDIUM"},
                new Object[]{"Design a Phone Stand", "Design and print a custom phone stand", "MEDIUM"},
                new Object[]{"Multi-Part Assembly Project", "Design an object that assembles from multiple parts", "HIGH"},
                new Object[]{"Flexible Filament Printing", "Experiment with TPU flexible material printing", "MEDIUM"},
                new Object[]{"Post-Processing Workshop", "Learn sanding, painting and finishing techniques", "LOW"},
                new Object[]{"Functional Part Design", "Design a functional mechanical part or tool", "HIGH"},
                new Object[]{"Miniature Sculpture", "Design and print a detailed miniature sculpture", "HIGH"},
                new Object[]{"Resin Printing Introduction", "Learn SLA/DLP resin printing basics", "MEDIUM"},
                new Object[]{"Collaborative Build Project", "Design and print a large multi-part group project", "HIGH"},
                new Object[]{"3D Printing Business Ideas", "Explore monetization and startup ideas using 3D printing", "LOW"},
                new Object[]{"End of Semester Print Exhibition", "Display best prints in a semester exhibition", "MEDIUM"}
            );
            default: return getDefaultTasks();
        }
    }

    private List<Object[]> getDefaultTasks() {
        return List.of(
            new Object[]{"Club Orientation", "Welcome session and introduction to club goals", "LOW"},
            new Object[]{"Skill Assessment", "Assess current skill levels of all members", "LOW"},
            new Object[]{"Workshop 1", "First learning workshop of the semester", "MEDIUM"},
            new Object[]{"Workshop 2", "Second learning workshop of the semester", "MEDIUM"},
            new Object[]{"Workshop 3", "Third learning workshop of the semester", "MEDIUM"},
            new Object[]{"Guest Session", "Invite an expert to share knowledge", "LOW"},
            new Object[]{"Group Project Kickoff", "Start a collaborative group project", "HIGH"},
            new Object[]{"Mid-Semester Review", "Review progress and adjust goals", "LOW"},
            new Object[]{"Workshop 4", "Fourth learning workshop of the semester", "MEDIUM"},
            new Object[]{"Workshop 5", "Fifth learning workshop of the semester", "MEDIUM"},
            new Object[]{"Project Progress Demo", "Demo current project progress to all members", "MEDIUM"},
            new Object[]{"Peer Learning Session", "Members teach each other their strongest skills", "LOW"},
            new Object[]{"Competition Preparation", "Prepare for inter-college competition", "HIGH"},
            new Object[]{"Final Project Completion", "Complete and polish the semester project", "HIGH"},
            new Object[]{"End of Semester Showcase", "Present all semester work in a final showcase", "MEDIUM"}
        );
    }

    // ─── ADMIN OPERATIONS ────────────────────────────────────────────

    public ClubResponse createClub(ClubRequest request, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can create clubs");
        StudentProfile admin = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Admin not found"));
        if (clubRepository.existsByTitle(request.getTitle().trim()))
            throw new ForbiddenException("A club with this title already exists");

        Club club = new Club();
        club.setTitle(request.getTitle().trim());
        club.setDescription(request.getDescription().trim());
        club.setCategory(request.getCategory());
        club.setLogoEmoji(getEmoji(request.getCategory()));
        club.setLinkedinUrl(request.getLinkedinUrl() != null ? request.getLinkedinUrl().trim() : "");
        club.setCreatedBy(rollNumber);
        club.setCreatedByName(admin.getName());
        club.setCreatedAt(LocalDateTime.now());
        club.setSemesterStartDate(LocalDateTime.now());
        club.setSemesterEndDate(LocalDateTime.now().plusMonths(6));
        club.setStatus("ACTIVE");
        club.setMaxMembers(request.getMaxMembers() != null ? request.getMaxMembers() : 15);
        club.setMembers(new ArrayList<>());
        club.setPendingMembers(new ArrayList<>());
        club.setAnnouncements(new ArrayList<>());
        club.setMessages(new ArrayList<>());
        club.setBadges(new ArrayList<>());
        club.setRoleRequests(new ArrayList<>());
        club.setMemberNicknames(new HashMap<>());
        club.setDailyAnnouncementCount(new HashMap<>());
        club.setActivities(seedActivities(request.getCategory(), rollNumber, admin.getName(), LocalDateTime.now()));
        
        // 🔒 no activity active initially
        club.setCurrentActivityId(null); 

        Club saved = clubRepository.save(club);
        System.out.println("[ClubService] Created: " + saved.getTitle() + " with " + saved.getActivities().size() + " activities");
        return mapToResponse(saved);
    }

    public ClubResponse adminEditClub(String clubId, ClubRequest request, String rollNumber) {
        if (!isAdminOrMod(rollNumber)) throw new ForbiddenException("Only admin/moderator can edit clubs");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        if (request.getDescription() != null && !request.getDescription().isBlank())
            club.setDescription(request.getDescription().trim());
        if (request.getMaxMembers() != null) club.setMaxMembers(request.getMaxMembers());
        if (request.getLinkedinUrl() != null) club.setLinkedinUrl(request.getLinkedinUrl().trim());
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse extendMembers(String clubId, int newMax, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can extend members");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        club.setMaxMembers(newMax);
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse dissolveClub(String clubId, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can dissolve clubs");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        club.setStatus("DISSOLVED");
        long total = club.getActivities().size();
        long done = club.getActivities().stream().filter(Club.ClubActivity::isCompleted).count();
        if (total > 0 && done == total) for (String r : club.getMembers()) awardBadge(club, r, "ALL_STAR");
        for (String r : club.getMembers())
            notificationService.create(r, "🎓 Club \"" + club.getTitle() + "\" semester completed!", "CLUB_DISSOLVED");
        clubRepository.save(club);
        return mapToResponse(club);
    }

//     public ClubResponse leaveClub(String clubId, String rollNumber) {
//     Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
    
//     // 1. Remove from members or pending
//     boolean removed = club.getMembers().remove(rollNumber);
//     if (!removed) {
//         club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(rollNumber));
//     }

//     // 2. Clear Roles if they were leadership
//     if (rollNumber.equals(club.getPresidentRoll())) {
//         club.setPresidentRoll(null);
//         // Note: Admin will see the "Request President" button again on frontend
//     }
//     if (rollNumber.equals(club.getVpRoll())) {
//         club.setVpRoll(null);
//     }

//     return mapToResponse(clubRepository.save(club));
// }


public ClubResponse leaveClub(String clubId, String rollNumber) {
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    // 1. Remove from members or pending
    boolean removed = club.getMembers().remove(rollNumber);
    if (!removed) {
        club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(rollNumber));
    }
 
    // 2. Clear leadership roles if applicable
    if (rollNumber.equals(club.getPresidentRoll())) {
        club.setPresidentRoll(null);
    }
    if (rollNumber.equals(club.getVpRoll())) {
        club.setVpRoll(null);
    }
 
    // ✅ 3. Record leave timestamp for 24-hour cooldown enforcement
    if (club.getRecentLeaves() == null) {
        club.setRecentLeaves(new java.util.HashMap<>());
    }
    club.getRecentLeaves().put(rollNumber, LocalDateTime.now());
 
    return mapToResponse(clubRepository.save(club));
}
 















    public ClubResponse renewSemester(String clubId, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can renew semester");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        StudentProfile admin = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Admin not found"));
        LocalDateTime now = LocalDateTime.now();
        club.setStatus("ACTIVE");
        club.setSemesterStartDate(now);
        club.setSemesterEndDate(now.plusMonths(6));
        club.setActivities(seedActivities(club.getCategory(), rollNumber, admin.getName(), now));
        club.setMembers(new ArrayList<>());
        club.setPendingMembers(new ArrayList<>());
        club.setPresidentRoll(null);
        club.setVpRoll(null);
        club.setEditCount(0);
        club.setExtraActivities(0);
        club.setAnnouncements(new ArrayList<>());
        club.setMessages(new ArrayList<>());
        club.setDailyAnnouncementCount(new HashMap<>());
        club.setThirtyDayWarningSent(false);
        club.setSevenDayWarningSent(false);
        notificationService.create(rollNumber, "🔄 Club \"" + club.getTitle() + "\" renewed!", "CLUB_RENEWED");
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse assignRole(String clubId, String targetRoll, String role, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator can assign roles");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        if (!club.isAnyMember(targetRoll)) throw new ForbiddenException("Student is not a member of this club");
        if (club.isPending(targetRoll)) {
            Club.PendingMember pm = club.getPendingMembers().stream()
                .filter(p -> p.getRollNumber().equals(targetRoll)).findFirst().orElse(null);
            if (pm != null) { club.getPendingMembers().remove(pm); club.getMembers().add(targetRoll); }
        }
        if ("PRESIDENT".equals(role)) {
            validateSingleLeadership(targetRoll);
            club.setPresidentRoll(targetRoll);
            awardBadge(club, targetRoll, "CLUB_LEADER");
            notificationService.create(targetRoll, "👑 You are now President of \"" + club.getTitle() + "\"!", "CLUB_ROLE");
            
           
        } else if ("VP".equals(role)) {
            club.setVpRoll(targetRoll);
            awardBadge(club, targetRoll, "TEAM_PLAYER");
            notificationService.create(targetRoll, "🤝 You are now VP of \"" + club.getTitle() + "\"!", "CLUB_ROLE");
        }

        // 🔥 FIX: set first activity when president assigned
int confirmedMembers = club.getMembers().size();
int needed = (int) Math.ceil(club.getMaxMembers() * 0.5);

if (confirmedMembers >= needed && club.getCurrentActivityId() == null) {
    if (!club.getActivities().isEmpty()) {
        Club.ClubActivity first = club.getActivities().get(0);

        if (first.getAvailableFrom() == null) {
            first.setAvailableFrom(LocalDateTime.now());
        }

        club.setCurrentActivityId(first.getId());
    }
}
        club.getRoleRequests().stream()
            .filter(r -> r.getRequestedBy().equals(targetRoll) && r.getRole().equals(role) && "PENDING".equals(r.getStatus()))
            .forEach(r -> r.setStatus("APPROVED"));
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse adminRemoveMember(String clubId, String targetRoll, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator can remove members");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(targetRoll));
        club.getMembers().remove(targetRoll);
        if (targetRoll.equals(club.getPresidentRoll())) {
            if (club.getVpRoll() != null) { club.setPresidentRoll(club.getVpRoll()); club.setVpRoll(null); }
            else club.setPresidentRoll(null);
        } else if (targetRoll.equals(club.getVpRoll())) club.setVpRoll(null);
        notificationService.create(targetRoll, "❌ You were removed from \"" + club.getTitle() + "\".", "CLUB_REMOVED");
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse adminConfirmAll(String clubId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        for (Club.PendingMember p : new ArrayList<>(club.getPendingMembers())) {
            club.getMembers().add(p.getRollNumber());
            notificationService.create(p.getRollNumber(), "🎉 You are now confirmed in \"" + club.getTitle() + "\"!", "CLUB_CONFIRMED");
        }
        club.getPendingMembers().clear();
        // 🔥 unlock first activity after members confirmed
int confirmedMembers = club.getMembers().size();
int needed = (int) Math.ceil(club.getMaxMembers() * 0.5);

if (confirmedMembers >= needed && club.getPresidentRoll() != null && club.getCurrentActivityId() == null) {
    Club.ClubActivity first = club.getActivities().get(0);

    if (first.getAvailableFrom() == null) {
        first.setAvailableFrom(LocalDateTime.now());
    }

    club.setCurrentActivityId(first.getId());
}
        return mapToResponse(clubRepository.save(club));
    }

public ClubResponse adminConfirmOne(String clubId, String rollNumber, String adminRoll) {
    if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Access Denied");

    Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));

 

    // 3. Add to regular members list if not already there
    if (!club.getMembers().contains(rollNumber)) {
        club.getMembers().add(rollNumber);
    }
    
    // 4. Remove from pending list
    club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(rollNumber));
    int confirmedMembers = club.getMembers().size();
int needed = (int) Math.ceil(club.getMaxMembers() * 0.5);

if (confirmedMembers >= needed && club.getPresidentRoll() != null && club.getCurrentActivityId() == null) {
    Club.ClubActivity first = club.getActivities().get(0);

    if (first.getAvailableFrom() == null) {
        first.setAvailableFrom(LocalDateTime.now());
    }

    club.setCurrentActivityId(first.getId());
}

    return mapToResponse(clubRepository.save(club));
}

    // ✅ Admin complete activity — bypasses all time checks
    public ClubResponse adminCompleteActivity(String clubId, String activityId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        Club.ClubActivity activity = club.getActivities().stream()
            .filter(a -> a.getId().equals(activityId)).findFirst()
            .orElseThrow(() -> new NotFoundException("Activity not found"));

        activity.setCompleted(true);
        activity.setCompletedAt(LocalDateTime.now());
        // ✅ unlock next activity
        unlockNextActivity(club, activity);
        return mapToResponse(clubRepository.save(club));
    }

    // ✅ Admin undo activity — resets completion and re-locks next
    public ClubResponse adminUndoActivity(String clubId, String activityId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        List<Club.ClubActivity> acts = club.getActivities();
        club.setCurrentActivityId(activityId);
        for (int i = 0; i < acts.size(); i++) {
            if (acts.get(i).getId().equals(activityId)) {
                acts.get(i).setCompleted(false);
                acts.get(i).setCompletedAt(null);
                // re-lock all activities after this one
                for (int j = i + 1; j < acts.size(); j++) {
                    acts.get(j).setAvailableFrom(null);
                    acts.get(j).setCompleted(false);
                    acts.get(j).setCompletedAt(null);
                }
                break;
            }
        }
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse adminDeleteActivity(String clubId, String activityId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        club.getActivities().removeIf(a -> a.getId().equals(activityId));
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse deleteAnnouncement(String clubId, String annId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        club.getAnnouncements().removeIf(a -> a.getId().equals(annId));
        return mapToResponse(clubRepository.save(club));
    }

    public void deleteClub(String clubId, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can delete clubs");
        clubRepository.deleteById(clubId);
    }

    // ─── MEMBER OPERATIONS ───────────────────────────────────────────

    // public ClubResponse joinClub(String clubId, String rollNumber) {
    //     Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
    //     if (club.isAnyMember(rollNumber)) throw new ForbiddenException("Already joined this club");
    //     if (club.isFull()) throw new ForbiddenException("This club is full");
    //     if (!"ACTIVE".equals(club.getStatus())) throw new ForbiddenException("Not accepting members");
    //     long joinedCount = clubRepository.findAll().stream().filter(c -> c.isAnyMember(rollNumber)).count();
    //     if (joinedCount >= 2) throw new ForbiddenException("You can only join up to 2 clubs");
    //     StudentProfile student = studentRepository.findByRollNumber(rollNumber)
    //         .orElseThrow(() -> new NotFoundException("Student not found"));
    //     club.getPendingMembers().add(new Club.PendingMember(rollNumber, student.getName(), LocalDateTime.now()));
    //     long daysSince = java.time.Duration.between(club.getCreatedAt(), LocalDateTime.now()).toDays();
    //     boolean early = daysSince <= 7;
    //     if (early) awardBadgeQuiet(club, rollNumber, "EARLY_MEMBER");
    //     String msg = "✅ Joined \"" + club.getTitle() + "\"! 2-day grace period started." + (early ? " 🌱 Early Member badge!" : "");
    //     notificationService.create(rollNumber, msg, "CLUB_JOIN");
    //     if (club.getPresidentRoll() != null)
    //         notificationService.create(club.getPresidentRoll(), "👋 " + student.getName() + " joined. 2 days to remove.", "CLUB_JOIN");
    //     clubRepository.save(club);
    //     return mapToResponse(club);
    // }



public ClubResponse joinClub(String clubId, String rollNumber) {
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    // Existing checks — unchanged
    if (club.isAnyMember(rollNumber)) throw new ForbiddenException("Already joined this club");
    if (club.isFull())                throw new ForbiddenException("This club is full");
    if (!"ACTIVE".equals(club.getStatus())) throw new ForbiddenException("Not accepting members");
 
    long joinedCount = clubRepository.findAll().stream()
        .filter(c -> c.isAnyMember(rollNumber)).count();
    if (joinedCount >= 2) throw new ForbiddenException("You can only join up to 2 clubs");
 
    // ✅ NEW CHECK (a) — 24hr cooldown on THIS specific club
    if (club.getRecentLeaves() != null && club.getRecentLeaves().containsKey(rollNumber)) {
        LocalDateTime leftAt  = club.getRecentLeaves().get(rollNumber);
        LocalDateTime canJoin = leftAt.plusHours(24);
        if (LocalDateTime.now().isBefore(canJoin)) {
            long hoursLeft = java.time.Duration.between(LocalDateTime.now(), canJoin).toHours() + 1;
            throw new ForbiddenException(
                "You left this club recently. You can rejoin in " + hoursLeft + " hour(s)."
            );
        }
        // Cooldown expired — clean up the entry so it doesn't grow forever
        club.getRecentLeaves().remove(rollNumber);
    }
 
    // ✅ NEW CHECK (b) — 24hr cooldown on ANY club after leaving one
    // Checks all clubs to see if student left any club within the last 24 hours
    LocalDateTime cutoff = LocalDateTime.now().minusHours(24);
    boolean leftAnyRecently = clubRepository.findAll().stream()
        .filter(c -> !c.getId().equals(clubId)) // skip current club (already checked above)
        .anyMatch(c ->
            c.getRecentLeaves() != null &&
            c.getRecentLeaves().containsKey(rollNumber) &&
            c.getRecentLeaves().get(rollNumber).isAfter(cutoff)
        );
 
    if (leftAnyRecently) {
        throw new ForbiddenException(
            "You recently left a club. You cannot join another club for 24 hours after leaving."
        );
    }
 
    // Everything passed — proceed with join (unchanged from original)
    StudentProfile student = studentRepository.findByRollNumber(rollNumber)
        .orElseThrow(() -> new NotFoundException("Student not found"));
 
    club.getPendingMembers().add(new Club.PendingMember(rollNumber, student.getName(), LocalDateTime.now()));
 
    long daysSince = java.time.Duration.between(club.getCreatedAt(), LocalDateTime.now()).toDays();
    boolean early  = daysSince <= 7;
    if (early) awardBadgeQuiet(club, rollNumber, "EARLY_MEMBER");
 
    String msg = "✅ Joined \"" + club.getTitle() + "\"! 2-day grace period started."
        + (early ? " 🌱 Early Member badge!" : "");
    notificationService.create(rollNumber, msg, "CLUB_JOIN");
 
    if (club.getPresidentRoll() != null)
        notificationService.create(club.getPresidentRoll(),
            "👋 " + student.getName() + " joined. 2 days to remove.", "CLUB_JOIN");
 
    clubRepository.save(club);
    return mapToResponse(club);
}














    public ClubResponse presidentRemoveMember(String clubId, String targetRoll, String presidentRoll) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        ensurePresident(club, presidentRoll);
        if (!club.isPending(targetRoll)) throw new ForbiddenException("President can only remove pending members");
        club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(targetRoll));
        notificationService.create(targetRoll, "❌ Removed from \"" + club.getTitle() + "\".", "CLUB_REMOVED");
        return mapToResponse(clubRepository.save(club));
    }

public void confirmPendingMembers(Club club) {
    LocalDateTime cutoff = LocalDateTime.now().minusDays(2);

    List<Club.PendingMember> toConfirm = club.getPendingMembers().stream()
            .filter(p -> p.getJoinedAt().isBefore(cutoff))
            .collect(Collectors.toList());

    for (Club.PendingMember p : toConfirm) {
        if (!club.getMembers().contains(p.getRollNumber())) {
            club.getMembers().add(p.getRollNumber());
        }
        club.getPendingMembers().remove(p);
        notificationService.create(
                p.getRollNumber(),
                "🎉 Confirmed member of \"" + club.getTitle() + "\"!",
                "CLUB_CONFIRMED"
        );
    }

    if (!toConfirm.isEmpty()) {
        int confirmedMembers = club.getMembers().size();
        int needed = (int) Math.ceil(club.getMaxMembers() * 0.5);

        if (confirmedMembers >= needed
                && club.getPresidentRoll() != null
                && club.getCurrentActivityId() == null
                && club.getActivities() != null
                && !club.getActivities().isEmpty()) {

            Club.ClubActivity first = club.getActivities().get(0);

            if (first.getAvailableFrom() == null) {
                first.setAvailableFrom(LocalDateTime.now());
            }

            club.setCurrentActivityId(first.getId());
        }

        clubRepository.save(club);
    }
}

    public ClubResponse requestRole(String clubId, String rollNumber, String role) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        if (!club.isAnyMember(rollNumber)) throw new ForbiddenException("Must be a member to request a role");
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        boolean already = club.getRoleRequests().stream()
            .anyMatch(r -> r.getRequestedBy().equals(rollNumber) && r.getRole().equals(role) && "PENDING".equals(r.getStatus()));
        if (already) throw new ForbiddenException("Already have a pending request");
        club.getRoleRequests().add(new Club.RoleRequest(
            UUID.randomUUID().toString(), rollNumber, student.getName(), role, "PENDING", LocalDateTime.now()));
        studentRepository.findAll().stream()
            .filter(s -> { String r = s.getRole() != null ? s.getRole().toString() : ""; return r.equals("ADMIN") || r.equals("MODERATOR"); })
            .forEach(s -> notificationService.create(s.getRollNumber(),
                "📋 " + student.getName() + " requested " + role + " in \"" + club.getTitle() + "\"", "CLUB_ROLE_REQUEST"));
        return mapToResponse(clubRepository.save(club));
    }




    // ─── ACTIVITY OPERATIONS ─────────────────────────────────────────

    // ✅ Helper: unlock next activity after completion
    private void unlockNextActivity(Club club, Club.ClubActivity completed) {
        List<Club.ClubActivity> acts = club.getActivities();
        for (int i = 0; i < acts.size(); i++) {
            if (acts.get(i).getId().equals(completed.getId()) && i + 1 < acts.size()) {
                Club.ClubActivity next = acts.get(i + 1);
                if (next.getAvailableFrom() == null) {
                    next.setAvailableFrom(LocalDateTime.now());
                    club.setCurrentActivityId(next.getId());
                }
                break;
            }
        }
    }
public ClubResponse completeActivity(String clubId, String activityId, String rollNumber) {

    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));

    // ✅ ONLY PRESIDENT
    ensurePresident(club, rollNumber);

    int confirmedMembers = club.getMembers().size();
    int needed = (int) Math.ceil(club.getMaxMembers() * 0.5);

    if (confirmedMembers < needed) {
        throw new ForbiddenException(
            "Activities locked. Need " + needed + " confirmed members, currently have " + confirmedMembers
        );
    }

    // ✅ GET ACTIVITIES FIRST (FIX 1)
    List<Club.ClubActivity> acts = club.getActivities();

    Club.ClubActivity activity = acts.stream()
        .filter(a -> a.getId().equals(activityId))
        .findFirst()
        .orElseThrow(() -> new NotFoundException("Activity not found"));

    // 🔥 FIX: SET FIRST ACTIVITY BEFORE ANY CHECK
    if (club.getCurrentActivityId() == null) {
        if (confirmedMembers >= needed && club.getPresidentRoll() != null) {
            Club.ClubActivity first = acts.get(0);

            if (first.getAvailableFrom() == null) {
                first.setAvailableFrom(LocalDateTime.now());
            }

            club.setCurrentActivityId(first.getId());
        }
    }

    // 🔒 BLOCK if NOT unlocked (NOW SAFE)
    if (activity.getAvailableFrom() == null) {
        throw new ForbiddenException("This activity is not unlocked yet");
    }

    // ✅ SEQUENCE CHECK
    Club.ClubActivity current = club.getCurrentActivity();
    if (current == null || !current.getId().equals(activityId)) {
        throw new ForbiddenException("You must complete activities in order");
    }

    // ✅ PREVIOUS ACTIVITY CHECK
    for (int i = 0; i < acts.size(); i++) {
        if (acts.get(i).getId().equals(activityId)) {
            if (i > 0 && !acts.get(i - 1).isCompleted()) {
                throw new ForbiddenException("Complete previous activity first");
            }
            break;
        }
    }

    if (activity.isCompleted()) {
        throw new ForbiddenException("Already completed");
    }

    // ✅ TIME CHECK
    long daysPassed = java.time.Duration.between(
        activity.getAvailableFrom(),
        LocalDateTime.now()
    ).toDays();

    int minDays = activity.getMinDaysToComplete() > 0 ? activity.getMinDaysToComplete() : 7;
    int maxDays = activity.getMaxDaysExpected() > 0 ? activity.getMaxDaysExpected() : 30;

    if (daysPassed > maxDays) {
        throw new ForbiddenException("Activity expired. Maximum time exceeded.");
    }

    if (daysPassed < minDays) {
        long daysLeft = minDays - daysPassed;
        throw new ForbiddenException(
            "Activity duration not completed. Need " + daysLeft + " more day(s)."
        );
    }

    // ✅ COMPLETE
    activity.setCompleted(true);
    activity.setCompletedAt(LocalDateTime.now());

    // ✅ UNLOCK NEXT
    unlockNextActivity(club, activity);

    long completedCount = club.getActivities().stream()
        .filter(Club.ClubActivity::isCompleted)
        .count();

    for (String r : club.getMembers()) {
        notificationService.create(r,
            "✅ \"" + activity.getTitle() + "\" completed! (" + completedCount + "/" + club.getActivities().size() + ")",
            "CLUB_ACTIVITY_DONE");
    }

    if (completedCount == 5) {
        for (String r : club.getMembers()) {
            awardBadge(club, r, "ACTIVE_CONTRIBUTOR");
        }
    }

    return mapToResponse(clubRepository.save(club));
}


public void backdateActivitiesForTesting(String clubId, String adminRoll) {
    if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Admin only");
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    LocalDateTime backdatedStart = club.getSemesterStartDate() != null
        ? club.getSemesterStartDate().minusDays(15)
        : LocalDateTime.now().minusDays(15);
    club.setSemesterStartDate(backdatedStart);
 
    List<Club.ClubActivity> acts = club.getActivities();
    for (int i = 0; i < acts.size(); i++) {
        Club.ClubActivity a = acts.get(i);
        if (a.getCreatedAt() != null)
            a.setCreatedAt(a.getCreatedAt().minusDays(15));
        else
            a.setCreatedAt(backdatedStart);
 
        if (i == 0) {
            a.setAvailableFrom(backdatedStart);
        } else if (a.getAvailableFrom() != null) {
            a.setAvailableFrom(a.getAvailableFrom().minusDays(15));
        }
    }
 
    clubRepository.save(club);
    System.out.println("[ClubService] Backdated 15 days for testing: " + club.getTitle());
}



    public ClubResponse addExtraActivity(String clubId, String title, String description, String rollNumber) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        
        // ✅ ONLY PRESIDENT CHECK
        ensurePresident(club, rollNumber);

        if (!club.isActivityUnlocked()) throw new ForbiddenException("Activities locked at 50% membership");
        if (club.getExtraActivities() >= MAX_EXTRA_ACTIVITIES) throw new ForbiddenException("Maximum 3 extra activities allowed");
        
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElseThrow(() -> new NotFoundException("Not found"));
        Club.ClubActivity a = new Club.ClubActivity();
        a.setId(UUID.randomUUID().toString());
        a.setTitle(title.trim());
        a.setDescription(description != null ? description.trim() : "");
        a.setAddedBy(rollNumber);
        a.setAddedByName(s.getName());
        a.setExtra(true);
        a.setAutoSeeded(false);
        a.setCompleted(false);
        a.setRiskLevel("MEDIUM");
        a.setMinDaysToComplete(10);
        a.setMaxDaysExpected(20);
        a.setAvailableFrom(null); 
        a.setCreatedAt(LocalDateTime.now());
        a.setVotes(new ArrayList<>());
        club.getActivities().add(a);
        club.setExtraActivities(club.getExtraActivities() + 1);
        for (String r : club.getMembers())
            if (!r.equals(rollNumber))
                notificationService.create(r, "📋 New activity in \"" + club.getTitle() + "\": " + title, "CLUB_ACTIVITY");
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse voteActivity(String clubId, String activityId, String rollNumber) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        
        // ✅ Member voting restriction
        if (!club.getMembers().contains(rollNumber)) {
            throw new ForbiddenException("Only confirmed members can vote");
        }
        
        Club.ClubActivity activity = club.getActivities().stream()
            .filter(a -> a.getId().equals(activityId)).findFirst()
            .orElseThrow(() -> new NotFoundException("Activity not found"));
        if (activity.getVotes().contains(rollNumber)) activity.getVotes().remove(rollNumber);
        else activity.getVotes().add(rollNumber);
        return mapToResponse(clubRepository.save(club));
    }


 

    // ─── PRESIDENT EDIT ──────────────────────────────────────────────

    public ClubResponse presidentEditClub(String clubId, String description, String rollNumber) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        ensurePresident(club, rollNumber);
        if (club.getEditCount() >= MAX_EDIT_COUNT) throw new ForbiddenException("Maximum 3 edits per semester");
        if (description != null && !description.trim().isEmpty()) {
            club.setDescription(description.trim());
            club.setEditCount(club.getEditCount() + 1);
        }
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse setNickname(String clubId, String targetRoll, String nickname, String presidentRoll) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        ensurePresident(club, presidentRoll);
        if (!club.isAnyMember(targetRoll)) throw new ForbiddenException("Not a member");
        if (nickname == null || nickname.trim().isEmpty()) { club.getMemberNicknames().remove(targetRoll); }
        else {
            String c = nickname.trim();
            if (c.length() > 20) throw new ForbiddenException("Max 20 characters");
            if (!c.matches("[a-zA-Z0-9 _-]+")) throw new ForbiddenException("Invalid characters");
            club.getMemberNicknames().put(targetRoll, c);
        }
        return mapToResponse(clubRepository.save(club));
    }


 

    // ─── ANNOUNCEMENTS ───────────────────────────────────────────────

    public ClubResponse addAnnouncement(String clubId, String title, String content, String rollNumber) {
    Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
    
    // Only President, VP, or Admin/Mod
    boolean isLeadership = rollNumber.equals(club.getPresidentRoll()) || rollNumber.equals(club.getVpRoll());
    if (!isLeadership && !isAdminOrMod(rollNumber)) {
        throw new ForbiddenException("Members cannot post announcements");
    }

        String dateKey = LocalDate.now() + ":" + rollNumber;
        int count = club.getDailyAnnouncementCount().getOrDefault(dateKey, 0);
        if (count >= MAX_DAILY_ANNOUNCEMENTS) throw new ForbiddenException("Max 2 announcements per day");
        
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElseThrow(() -> new NotFoundException("Not found"));
        Club.ClubAnnouncement ann = new Club.ClubAnnouncement(
            UUID.randomUUID().toString(), title.trim(), content.trim(), rollNumber, s.getName(), false, LocalDateTime.now());
        club.getAnnouncements().add(0, ann);
        club.getDailyAnnouncementCount().put(dateKey, count + 1);
        for (String r : club.getMembers())
            if (!r.equals(rollNumber))
                notificationService.create(r, "📢 \"" + club.getTitle() + "\": " + title, "CLUB_ANNOUNCEMENT");
        return mapToResponse(clubRepository.save(club));
    }

public ClubResponse pinAnnouncement(String clubId, String annId, String rollNumber) {
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
    boolean canPin = rollNumber.equals(club.getPresidentRoll()) || isAdminOrMod(rollNumber);
    if (!canPin) throw new ForbiddenException("Only President or Admin can pin announcements");
    club.getAnnouncements().forEach(a -> a.setPinned(a.getId().equals(annId) && !a.isPinned()));
    return mapToResponse(clubRepository.save(club));
}

    // ─── CHAT ─────────────────────────────────────────────────────────

    public ClubResponse sendMessage(String clubId, String content, String rollNumber) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        if (!club.hasMember(rollNumber)) throw new ForbiddenException("Only confirmed members can chat");
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElseThrow(() -> new NotFoundException("Not found"));
        Club.ClubMessage msg = new Club.ClubMessage(UUID.randomUUID().toString(), content.trim(), rollNumber, s.getName(), false, LocalDateTime.now());
        if (club.getMessages().size() >= MAX_CHAT_MESSAGES) club.getMessages().remove(0);
        club.getMessages().add(msg);
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse deleteMessage(String clubId, String messageId, String rollNumber) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found"));
        boolean isPres = rollNumber.equals(club.getPresidentRoll());
        boolean isAdm = isAdminOrMod(rollNumber);
        Club.ClubMessage msg = club.getMessages().stream().filter(m -> m.getId().equals(messageId)).findFirst()
            .orElseThrow(() -> new NotFoundException("Message not found"));
        if (!msg.getSenderRoll().equals(rollNumber) && !isPres && !isAdm)
            throw new ForbiddenException("You can only delete your own messages");
        club.getMessages().removeIf(m -> m.getId().equals(messageId));
        return mapToResponse(clubRepository.save(club));
    }

    // ─── GETTERS ──────────────────────────────────────────────────────

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll().stream().peek(this::confirmPendingMembers).map(this::mapToResponse).collect(Collectors.toList());
    }

    public ClubResponse getClub(String clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new NotFoundException("Club not found: " + clubId));
        confirmPendingMembers(club);
        return mapToResponse(club);
    }

    public long getClubCount() { return clubRepository.count(); }

    // ─── BADGE HELPERS ────────────────────────────────────────────────

    private void awardBadge(Club club, String rollNumber, String badgeType) {
        boolean has = club.getBadges().stream().anyMatch(b -> b.getRollNumber().equals(rollNumber) && b.getBadgeType().equals(badgeType));
        if (has) return;
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElse(null);
        club.getBadges().add(new Club.ClubBadge(rollNumber, s != null ? s.getName() : "Unknown", badgeType, LocalDateTime.now()));
        notificationService.create(rollNumber, "🏅 " + badgeType.replace("_", " ") + " badge in \"" + club.getTitle() + "\"!", "CLUB_BADGE");
    }

    private void awardBadgeQuiet(Club club, String rollNumber, String badgeType) {
        boolean has = club.getBadges().stream().anyMatch(b -> b.getRollNumber().equals(rollNumber) && b.getBadgeType().equals(badgeType));
        if (has) return;
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElse(null);
        club.getBadges().add(new Club.ClubBadge(rollNumber, s != null ? s.getName() : "Unknown", badgeType, LocalDateTime.now()));
    }

    private String getEmoji(String category) {
        if (category == null) return "🏛️";
        return switch (category) {
            case "AI" -> "🤖"; case "3D_PRINTING" -> "🖨️"; case "WEB_DEV" -> "💻";
            case "ROBOTICS" -> "🦾"; case "ENTREPRENEURSHIP" -> "🚀"; case "TECH_FEST" -> "🎉";
            case "SPORTS" -> "⚽"; case "CULTURAL" -> "🎭"; case "TOASTMASTERS" -> "🎤";
            case "PHOTOGRAPHY" -> "📷"; default -> "🏛️";
        };
    }


  
    // ─── MAP TO RESPONSE ──────────────────────────────────────────────

    private ClubResponse mapToResponse(Club club) {
        ClubResponse res = new ClubResponse();
        res.setId(club.getId());
        res.setTitle(club.getTitle());
        res.setDescription(club.getDescription());
        res.setCategory(club.getCategory());
        res.setLogoEmoji(club.getLogoEmoji() != null ? club.getLogoEmoji() : "🏛️");
        res.setLinkedinUrl(club.getLinkedinUrl());
        res.setCreatedBy(club.getCreatedBy());
        res.setCreatedByName(club.getCreatedByName());
        res.setCreatedAt(club.getCreatedAt());
        res.setSemesterStartDate(club.getSemesterStartDate());
        res.setSemesterEndDate(club.getSemesterEndDate());
        res.setStatus(club.getStatus());
        res.setMaxMembers(club.getMaxMembers());
        res.setMembers(club.getMembers());
        res.setPendingMembers(club.getPendingMembers());
        res.setMemberCount(club.getMembers().size() + club.getPendingMembers().size());
        res.setFull(club.isFull());
        res.setPresidentRoll(club.getPresidentRoll());
        res.setVpRoll(club.getVpRoll());
        res.setActivities(club.getActivities());
        res.setAnnouncements(club.getAnnouncements());
        res.setMessages(club.getMessages());
        res.setBadges(club.getBadges());
        res.setRoleRequests(club.getRoleRequests());
        res.setEditCount(club.getEditCount());
        res.setExtraActivities(club.getExtraActivities());
        res.setActivityUnlocked(club.isActivityUnlocked());
        res.setMemberNicknames(club.getMemberNicknames());

        Club.ClubActivity current = club.getCurrentActivity();
        if (current != null) res.setCurrentActivityId(current.getId());

        if (club.getPresidentRoll() != null)
            studentRepository.findByRollNumber(club.getPresidentRoll()).ifPresent(s -> res.setPresidentName(s.getName()));
        if (club.getVpRoll() != null)
            studentRepository.findByRollNumber(club.getVpRoll()).ifPresent(s -> res.setVpName(s.getName()));

        List<MemberInfo> memberDetails = new ArrayList<>();
        club.getMembers().stream().map(r -> {
            StudentProfile s = studentRepository.findByRollNumber(r).orElse(null);
            return new MemberInfo(r, s != null ? s.getName() : "Unknown", s != null ? s.getYear() : "-", s != null ? s.getBranch() : "-", null);
        }).forEach(memberDetails::add);
        club.getPendingMembers().stream().map(p -> {
            StudentProfile s = studentRepository.findByRollNumber(p.getRollNumber()).orElse(null);
            return new MemberInfo(p.getRollNumber(), p.getName(), s != null ? s.getYear() : "-", s != null ? s.getBranch() : "-", null);
        }).forEach(memberDetails::add);
        res.setMemberDetails(memberDetails);

        res.setTotalActivities(club.getActivities().size());
        res.setCompletedActivities((int) club.getActivities().stream().filter(Club.ClubActivity::isCompleted).count());

        String todayKey = LocalDate.now().toString();
        if (club.getPresidentRoll() != null)
            res.setPresidentAnnouncementsToday(club.getDailyAnnouncementCount().getOrDefault(todayKey + ":" + club.getPresidentRoll(), 0));
        if (club.getVpRoll() != null)
            res.setVpAnnouncementsToday(club.getDailyAnnouncementCount().getOrDefault(todayKey + ":" + club.getVpRoll(), 0));

        return res;
    }
}