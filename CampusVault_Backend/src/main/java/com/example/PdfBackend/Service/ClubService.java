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

    // ─── ROLE HELPERS ───────────────────────────────────────────────────────

    private boolean isAdminOrMod(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber)
            .map(s -> {
                String r = s.getRole() != null ? s.getRole().toString() : "";
                return r.equals("ADMIN") || r.equals("MODERATOR");
            }).orElse(false);
    }

    private boolean isAdminOnly(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber)
            .map(s -> s.getRole() != null && s.getRole().toString().equals("ADMIN"))
            .orElse(false);
    }

    // ─── ACTIVITY SEEDING ───────────────────────────────────────────────────

    private List<Club.ClubActivity> seedActivities(String category, String adminRoll, String adminName) {
        List<String[]> tasks = getTasksForCategory(category);
        List<Club.ClubActivity> list = new ArrayList<>();
        for (String[] task : tasks) {
            Club.ClubActivity a = new Club.ClubActivity();
            a.setId(UUID.randomUUID().toString());
            a.setTitle(task[0]);
            a.setDescription(task[1]);
            a.setAddedBy(adminRoll);
            a.setAddedByName(adminName);
            a.setAutoSeeded(true);
            a.setExtra(false);
            a.setCompleted(false);
            a.setCreatedAt(LocalDateTime.now().minusHours(25)); // ✅ pre-aged 25hrs so president can complete immediately
            a.setVotes(new ArrayList<>());
            list.add(a);
        }
        System.out.println("[ClubService] Seeded " + list.size() + " activities for category: " + category);
        return list;
    }

    private List<String[]> getTasksForCategory(String category) {
        if (category == null) return getDefaultTasks();
        switch (category) {
            case "AI": return List.of(
                new String[]{"Setup Python & ML Environment", "Install Python, pip, Jupyter Notebook and essential ML libraries"},
                new String[]{"Study Neural Network Basics", "Learn about neurons, layers, activation functions and backpropagation"},
                new String[]{"Implement Linear Regression", "Build and train a linear regression model from scratch"},
                new String[]{"Build a Simple Chatbot", "Create a rule-based chatbot using Python"},
                new String[]{"Explore Datasets on Kaggle", "Find and analyze 3 real-world datasets relevant to your interests"},
                new String[]{"Train an Image Classifier", "Use a CNN to classify images from CIFAR-10 or MNIST"},
                new String[]{"Study Natural Language Processing", "Learn tokenization, embeddings and basic NLP pipelines"},
                new String[]{"Build a Recommendation System", "Implement a collaborative filtering recommendation engine"},
                new String[]{"Host a Model Demo Session", "Present your trained model to club members"},
                new String[]{"Kaggle Competition Entry", "Participate in a beginner Kaggle competition as a team"},
                new String[]{"Study Transformer Architecture", "Deep dive into attention mechanism and BERT/GPT basics"},
                new String[]{"Build a Sentiment Analyzer", "Train a model to classify positive/negative reviews"},
                new String[]{"Conduct AI Ethics Discussion", "Discuss bias, fairness and responsible AI in a group session"},
                new String[]{"Deploy a Model to Cloud", "Deploy your ML model using Hugging Face Spaces or Render"},
                new String[]{"End of Semester Project Demo", "Present final AI project to the entire club"}
            );
            case "WEB_DEV": return List.of(
                new String[]{"HTML & CSS Fundamentals", "Build a static webpage with proper semantic HTML and CSS"},
                new String[]{"JavaScript Basics Workshop", "Learn variables, functions, DOM manipulation and events"},
                new String[]{"Build a Portfolio Website", "Create a personal portfolio site and host it on GitHub Pages"},
                new String[]{"Learn React Fundamentals", "Study components, props, state and hooks"},
                new String[]{"Build a Todo App with React", "Create a fully functional todo app with CRUD operations"},
                new String[]{"REST API Basics", "Learn HTTP methods, status codes and how to consume APIs"},
                new String[]{"Build a Weather App", "Consume a public weather API and display data beautifully"},
                new String[]{"Database Basics with MongoDB", "Learn collections, documents, CRUD in MongoDB"},
                new String[]{"Build a Full Stack App", "Create a simple full stack app with React + Node/Spring"},
                new String[]{"Learn Git & GitHub", "Master branching, pull requests and collaborative workflows"},
                new String[]{"Responsive Design Workshop", "Make websites look great on all screen sizes using Tailwind"},
                new String[]{"Authentication Implementation", "Add login/register with JWT to your full stack project"},
                new String[]{"Deploy to Production", "Deploy frontend to Vercel and backend to Render"},
                new String[]{"Code Review Session", "Review each other's code and give constructive feedback"},
                new String[]{"End of Semester Project Demo", "Present complete web project to the club"}
            );
            case "ROBOTICS": return List.of(
                new String[]{"Introduction to Arduino", "Setup Arduino IDE and blink an LED"},
                new String[]{"Learn Basic Electronics", "Study resistors, capacitors, transistors and circuits"},
                new String[]{"Build a Line Follower Robot", "Assemble and program a basic line follower"},
                new String[]{"Servo Motor Control", "Control servo motors using Arduino PWM signals"},
                new String[]{"Ultrasonic Sensor Project", "Build an obstacle avoiding robot using HC-SR04"},
                new String[]{"Introduction to Raspberry Pi", "Setup Raspberry Pi and run basic Python scripts"},
                new String[]{"Wireless Control via Bluetooth", "Control a robot via Bluetooth from a mobile phone"},
                new String[]{"3D Print a Robot Part", "Design and 3D print a mechanical component for your robot"},
                new String[]{"Computer Vision Basics", "Use OpenCV to detect objects with a camera"},
                new String[]{"Robot Arm Assembly", "Build and program a basic robotic arm"},
                new String[]{"Autonomous Navigation", "Program a robot to navigate a maze autonomously"},
                new String[]{"ROS Introduction", "Install Robot Operating System and run a basic simulation"},
                new String[]{"Inter-Club Demo Day", "Showcase robot to students from other clubs"},
                new String[]{"Competitive Robotics Practice", "Prepare for inter-college robotics competition"},
                new String[]{"End of Semester Project Demo", "Present final robotics project to the club"}
            );
            case "ENTREPRENEURSHIP": return List.of(
                new String[]{"Ideation Workshop", "Generate 10 startup ideas and evaluate feasibility"},
                new String[]{"Market Research Basics", "Learn how to research target market and competitors"},
                new String[]{"Build a Business Model Canvas", "Create a BMC for your top startup idea"},
                new String[]{"Financial Modeling Basics", "Learn revenue models, unit economics and projections"},
                new String[]{"Startup Pitch Practice", "Prepare and deliver a 3-minute elevator pitch"},
                new String[]{"Guest Speaker Session", "Invite a local entrepreneur to share their journey"},
                new String[]{"Build an MVP", "Create a minimum viable product for your idea"},
                new String[]{"User Interview Practice", "Conduct 5 user interviews and summarize insights"},
                new String[]{"Legal Basics for Startups", "Study company registration, IP and contracts basics"},
                new String[]{"Fundraising & Investors", "Learn about angel investors, VCs and startup funding"},
                new String[]{"Growth Hacking Workshop", "Study customer acquisition and retention strategies"},
                new String[]{"Social Media Marketing", "Build a social media presence for your startup idea"},
                new String[]{"Pitch Competition Prep", "Prepare for inter-college startup pitch competition"},
                new String[]{"Networking Event", "Attend or organize a networking event with industry people"},
                new String[]{"End of Semester Demo Day", "Present startup progress to club and invited guests"}
            );
            case "SPORTS": return List.of(
                new String[]{"Fitness Assessment", "Conduct baseline fitness test for all members"},
                new String[]{"Team Selection Trials", "Organize trials and finalize team composition"},
                new String[]{"Strength Training Workshop", "Learn proper form for squats, deadlifts and bench press"},
                new String[]{"Cardio & Endurance Training", "Complete a 5K run and track improvement over semester"},
                new String[]{"Sport-Specific Skills Session", "Practice fundamental skills of the club's primary sport"},
                new String[]{"Nutrition & Diet Workshop", "Learn about sports nutrition and meal planning"},
                new String[]{"First Aid Training", "Learn basic first aid for sports injuries"},
                new String[]{"Friendly Match vs Another Club", "Organize an internal friendly match or tournament"},
                new String[]{"Mental Fitness Session", "Study sports psychology and performance mindset"},
                new String[]{"Video Analysis Session", "Watch and analyze professional game footage"},
                new String[]{"Agility & Speed Training", "Complete ladder drills and sprint interval sessions"},
                new String[]{"Recovery & Injury Prevention", "Learn stretching routines and injury prevention"},
                new String[]{"Inter-Department Tournament", "Participate in college inter-department tournament"},
                new String[]{"Coach Feedback Session", "Get feedback from college coach or external trainer"},
                new String[]{"End of Semester Championship", "Organize end-of-semester championship match"}
            );
            case "CULTURAL": return List.of(
                new String[]{"Introduction & Ice Breaker", "Welcome session with fun cultural exchange activities"},
                new String[]{"Traditional Dance Workshop", "Learn steps of a traditional dance from your culture"},
                new String[]{"Music Appreciation Session", "Explore different genres and instruments from world music"},
                new String[]{"Art Exhibition Planning", "Plan and organize a mini art exhibition"},
                new String[]{"Drama & Acting Workshop", "Participate in a short acting and improv session"},
                new String[]{"Photography Walk", "Go on a campus photography walk and share best shots"},
                new String[]{"Cultural Food Festival", "Organize a small food festival with dishes from different regions"},
                new String[]{"Poetry & Literature Night", "Share original poems, stories or literary works"},
                new String[]{"Rangoli & Art Workshop", "Create rangoli or traditional art as a group"},
                new String[]{"Short Film Making", "Write, shoot and edit a short 3-minute film"},
                new String[]{"Guest Artist Session", "Invite a local artist, musician or performer"},
                new String[]{"Flash Mob Practice", "Choreograph and practice a flash mob performance"},
                new String[]{"Inter-College Cultural Fest Prep", "Prepare entries for inter-college cultural competition"},
                new String[]{"Cultural Documentary Screening", "Watch and discuss a cultural documentary together"},
                new String[]{"End of Semester Showcase", "Present all semester work in a grand showcase event"}
            );
            case "TOASTMASTERS": return List.of(
                new String[]{"Ice Breaker Speeches", "Every member delivers a 4-6 minute introductory speech"},
                new String[]{"Table Topics Practice", "Impromptu 1-2 minute speeches on random topics"},
                new String[]{"Prepared Speech Session", "Deliver a 5-7 minute speech on a chosen topic"},
                new String[]{"Evaluation Workshop", "Learn how to give constructive speech evaluations"},
                new String[]{"Body Language & Gestures", "Study and practice effective non-verbal communication"},
                new String[]{"Storytelling Workshop", "Learn narrative structure and deliver a story speech"},
                new String[]{"Debate Session", "Organize a formal debate on a current affairs topic"},
                new String[]{"Persuasive Speaking", "Prepare and deliver a persuasive speech"},
                new String[]{"Humorous Speech Contest", "Internal contest for funniest speech"},
                new String[]{"Business Presentation Skills", "Practice presenting data and reports professionally"},
                new String[]{"Interview Skills Workshop", "Mock interview practice with feedback"},
                new String[]{"Public Speaking Fear Session", "Exercises to overcome stage fright"},
                new String[]{"Inter-Club Speech Contest", "Compete with other college Toastmasters clubs"},
                new String[]{"Leadership & Facilitation", "Learn how to run meetings and facilitate discussions"},
                new String[]{"End of Semester Gala", "Grand speech event with awards ceremony"}
            );
            case "PHOTOGRAPHY": return List.of(
                new String[]{"Camera Basics Workshop", "Learn aperture, shutter speed, ISO and white balance"},
                new String[]{"Composition Rules", "Study rule of thirds, leading lines and framing"},
                new String[]{"Portrait Photography Session", "Practice portrait photography with natural light"},
                new String[]{"Landscape Photography Walk", "Campus landscape photography walk and critique"},
                new String[]{"Street Photography Project", "Capture candid street moments around campus"},
                new String[]{"Lightroom Editing Basics", "Learn basic photo editing and color grading"},
                new String[]{"Night Photography Session", "Practice long exposure and night photography"},
                new String[]{"Photo Story Project", "Create a 10-photo story on a chosen theme"},
                new String[]{"Product Photography Workshop", "Learn studio-style product photography"},
                new String[]{"Mobile Photography Tips", "Master smartphone photography techniques"},
                new String[]{"Photo Exhibition Planning", "Curate and plan an end-of-semester exhibition"},
                new String[]{"Interview a Subject", "Conduct an environmental portrait interview session"},
                new String[]{"Drone Photography Basics", "Introduction to aerial photography concepts"},
                new String[]{"Photo Contest", "Internal photo contest with voting by all members"},
                new String[]{"End of Semester Exhibition", "Display best semester work in a photo exhibition"}
            );
            case "TECH_FEST": return List.of(
                new String[]{"Event Planning Kickoff", "Define fest theme, events list and timeline"},
                new String[]{"Sponsorship Outreach", "Identify and contact potential sponsors"},
                new String[]{"Marketing & Posters", "Design and distribute event promotional material"},
                new String[]{"Registration System Setup", "Build or configure online registration for events"},
                new String[]{"Venue & Logistics Planning", "Book venues, arrange seating and logistics"},
                new String[]{"Hackathon Organization", "Plan and organize the fest's main hackathon"},
                new String[]{"Technical Events Coordination", "Coordinate coding, quiz and debugging events"},
                new String[]{"Non-Technical Events Setup", "Plan gaming, art and cultural tech events"},
                new String[]{"Guest Speaker Coordination", "Invite and coordinate industry guest speakers"},
                new String[]{"Volunteer Management", "Recruit and assign volunteers for each event"},
                new String[]{"Social Media Campaign", "Run social media countdown and live coverage"},
                new String[]{"Dry Run & Rehearsal", "Conduct full dry run of all fest events"},
                new String[]{"Prize & Certificate Arrangement", "Arrange prizes, trophies and certificates"},
                new String[]{"Live Coverage During Fest", "Manage live updates and documentation during fest"},
                new String[]{"Post-Fest Wrap Up", "Collect feedback, document learnings and close fest"}
            );
            case "3D_PRINTING": return List.of(
                new String[]{"3D Printing Basics", "Learn FDM printing process, materials and settings"},
                new String[]{"CAD Software Introduction", "Get started with Fusion 360 or TinkerCAD"},
                new String[]{"Design a Simple Object", "Design and print a basic geometric object"},
                new String[]{"Slicing Software Workshop", "Learn Cura slicer settings for optimal prints"},
                new String[]{"Print Quality Troubleshooting", "Identify and fix common print failures"},
                new String[]{"Design a Phone Stand", "Design and print a custom phone stand"},
                new String[]{"Multi-Part Assembly Project", "Design an object that assembles from multiple parts"},
                new String[]{"Flexible Filament Printing", "Experiment with TPU flexible material printing"},
                new String[]{"Post-Processing Workshop", "Learn sanding, painting and finishing techniques"},
                new String[]{"Functional Part Design", "Design a functional mechanical part or tool"},
                new String[]{"Miniature Sculpture", "Design and print a detailed miniature sculpture"},
                new String[]{"Resin Printing Introduction", "Learn SLA/DLP resin printing basics"},
                new String[]{"Collaborative Build Project", "Design and print a large multi-part group project"},
                new String[]{"3D Printing Business Ideas", "Explore monetization and startup ideas using 3D printing"},
                new String[]{"End of Semester Print Exhibition", "Display best prints in a semester exhibition"}
            );
            default: return getDefaultTasks();
        }
    }

    private List<String[]> getDefaultTasks() {
        return List.of(
            new String[]{"Club Orientation", "Welcome session and introduction to club goals"},
            new String[]{"Skill Assessment", "Assess current skill levels of all members"},
            new String[]{"Workshop 1", "First learning workshop of the semester"},
            new String[]{"Workshop 2", "Second learning workshop of the semester"},
            new String[]{"Workshop 3", "Third learning workshop of the semester"},
            new String[]{"Guest Session", "Invite an expert to share knowledge"},
            new String[]{"Group Project Kickoff", "Start a collaborative group project"},
            new String[]{"Mid-Semester Review", "Review progress and adjust goals"},
            new String[]{"Workshop 4", "Fourth learning workshop of the semester"},
            new String[]{"Workshop 5", "Fifth learning workshop of the semester"},
            new String[]{"Project Progress Demo", "Demo current project progress to all members"},
            new String[]{"Peer Learning Session", "Members teach each other their strongest skills"},
            new String[]{"Competition Preparation", "Prepare for inter-college competition"},
            new String[]{"Final Project Completion", "Complete and polish the semester project"},
            new String[]{"End of Semester Showcase", "Present all semester work in a final showcase"}
        );
    }

    // ─── ADMIN OPERATIONS ───────────────────────────────────────────────────

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

        // ✅ seed activities inline — no static method dependency
        List<Club.ClubActivity> seeded = seedActivities(request.getCategory(), rollNumber, admin.getName());
        club.setActivities(seeded);

        Club saved = clubRepository.save(club);
        System.out.println("[ClubService] Created club: " + saved.getTitle() + " with " + saved.getActivities().size() + " activities");
        return mapToResponse(saved);
    }

    public ClubResponse adminEditClub(String clubId, ClubRequest request, String rollNumber) {
        if (!isAdminOrMod(rollNumber)) throw new ForbiddenException("Only admin/moderator can edit clubs");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (request.getDescription() != null && !request.getDescription().isBlank())
            club.setDescription(request.getDescription().trim());
        if (request.getMaxMembers() != null) club.setMaxMembers(request.getMaxMembers());
        if (request.getLinkedinUrl() != null) club.setLinkedinUrl(request.getLinkedinUrl().trim());
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse extendMembers(String clubId, int newMax, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can extend members");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        club.setMaxMembers(newMax);
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse dissolveClub(String clubId, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can dissolve clubs");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        club.setStatus("DISSOLVED");
        long total = club.getActivities().size();
        long done = club.getActivities().stream().filter(Club.ClubActivity::isCompleted).count();
        if (total > 0 && done == total)
            for (String roll : club.getMembers()) awardBadge(club, roll, "ALL_STAR");
        for (String roll : club.getMembers())
            notificationService.create(roll,
                "🎓 Club \"" + club.getTitle() + "\" semester completed. Thank you for participating!",
                "CLUB_DISSOLVED");
        clubRepository.save(club);
        return mapToResponse(club);
    }

    public ClubResponse renewSemester(String clubId, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can renew semester");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        StudentProfile admin = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Admin not found"));
        club.setStatus("ACTIVE");
        club.setSemesterStartDate(LocalDateTime.now());
        club.setSemesterEndDate(LocalDateTime.now().plusMonths(6));
        club.setActivities(seedActivities(club.getCategory(), rollNumber, admin.getName()));
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
        notificationService.create(rollNumber,
            "🔄 Club \"" + club.getTitle() + "\" renewed for a new semester!", "CLUB_RENEWED");
        return mapToResponse(clubRepository.save(club));
    }




   public ClubResponse assignRole(String clubId, String targetRoll, String role, String adminRoll) {
    if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator can assign roles");
 
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    if (!club.isAnyMember(targetRoll))
        throw new ForbiddenException("Student is not a member of this club");
 
    // ✅ if student is pending and being made President/VP — auto-confirm them immediately
    if (club.isPending(targetRoll)) {
        Club.PendingMember pending = club.getPendingMembers().stream()
            .filter(p -> p.getRollNumber().equals(targetRoll))
            .findFirst().orElse(null);
        if (pending != null) {
            club.getPendingMembers().remove(pending);
            club.getMembers().add(targetRoll);
            notificationService.create(targetRoll,
                "🎉 You were automatically confirmed as a full member of \"" + club.getTitle() + "\" upon role assignment.",
                "CLUB_CONFIRMED");
        }
    }
 
    if ("PRESIDENT".equals(role)) {
        club.setPresidentRoll(targetRoll);
        awardBadge(club, targetRoll, "CLUB_LEADER");
        notificationService.create(targetRoll,
            "👑 You have been assigned as President of \"" + club.getTitle() + "\"!", "CLUB_ROLE");
    } else if ("VP".equals(role)) {
        club.setVpRoll(targetRoll);
        awardBadge(club, targetRoll, "TEAM_PLAYER");
        notificationService.create(targetRoll,
            "🤝 You have been assigned as VP of \"" + club.getTitle() + "\"!", "CLUB_ROLE");
    }
 
    club.getRoleRequests().stream()
        .filter(r -> r.getRequestedBy().equals(targetRoll)
            && r.getRole().equals(role) && "PENDING".equals(r.getStatus()))
        .forEach(r -> r.setStatus("APPROVED"));
 
    return mapToResponse(clubRepository.save(club));
}




    public ClubResponse adminRemoveMember(String clubId, String targetRoll, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator can remove members");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(targetRoll));
        club.getMembers().remove(targetRoll);
        if (targetRoll.equals(club.getPresidentRoll())) {
            if (club.getVpRoll() != null) {
                String vp = club.getVpRoll();
                club.setPresidentRoll(vp);
                club.setVpRoll(null);
                notificationService.create(vp,
                    "👑 You are now President of \"" + club.getTitle() + "\" after promotion.", "CLUB_ROLE");
            } else {
                club.setPresidentRoll(null);
            }
        } else if (targetRoll.equals(club.getVpRoll())) {
            club.setVpRoll(null);
        }
        notificationService.create(targetRoll,
            "❌ You were removed from \"" + club.getTitle() + "\" by admin.", "CLUB_REMOVED");
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse adminConfirmAll(String clubId, String adminRoll) {
    if (!isAdminOrMod(adminRoll))
        throw new ForbiddenException("Only admin/moderator");

    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));

    if (club.getPendingMembers() == null || club.getPendingMembers().isEmpty())
        return mapToResponse(club);

    List<Club.PendingMember> pendingList = new ArrayList<>(club.getPendingMembers());

    for (Club.PendingMember p : pendingList) {
        club.getMembers().add(p.getRollNumber());

        notificationService.create(p.getRollNumber(),
            "🎉 You are now a confirmed member of \"" + club.getTitle() + "\"!",
            "CLUB_CONFIRMED");
    }

    club.getPendingMembers().clear();

    return mapToResponse(clubRepository.save(club));
}

    // ✅ Admin confirms pending members instantly (for testing)
  public ClubResponse adminConfirmOne(String clubId, String targetRoll, String adminRoll) {
    if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
    Club.PendingMember pending = club.getPendingMembers().stream()
        .filter(p -> p.getRollNumber().equals(targetRoll))
        .findFirst()
        .orElseThrow(() -> new NotFoundException("Pending member not found"));
    club.getPendingMembers().remove(pending);
    club.getMembers().add(targetRoll);
    notificationService.create(targetRoll,
        "🎉 You are now a confirmed member of \"" + club.getTitle() + "\"!", "CLUB_CONFIRMED");
    return mapToResponse(clubRepository.save(club));
}

    // ✅ Admin delete activity
    public ClubResponse adminDeleteActivity(String clubId, String activityId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator can delete activities");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        club.getActivities().removeIf(a -> a.getId().equals(activityId));
        return mapToResponse(clubRepository.save(club));
    }

    // ✅ Admin override complete activity (skip 24hr check)
    public ClubResponse adminCompleteActivity(String clubId, String activityId, String adminRoll) {
        if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        club.getActivities().stream()
            .filter(a -> a.getId().equals(activityId) && !a.isCompleted())
            .findFirst()
            .ifPresent(a -> { a.setCompleted(true); a.setCompletedAt(LocalDateTime.now()); });
        return mapToResponse(clubRepository.save(club));
    }

    public void deleteClub(String clubId, String rollNumber) {
        if (!isAdminOnly(rollNumber)) throw new ForbiddenException("Only admin can delete clubs");
        clubRepository.deleteById(clubId);
    }

    // ─── MEMBER OPERATIONS ──────────────────────────────────────────────────

    public ClubResponse joinClub(String clubId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (club.isAnyMember(rollNumber)) throw new ForbiddenException("You have already joined this club");
        if (club.isFull()) throw new ForbiddenException("This club is full");
        if (!"ACTIVE".equals(club.getStatus())) throw new ForbiddenException("This club is not accepting members");
        long joinedCount = clubRepository.findAll().stream().filter(c -> c.isAnyMember(rollNumber)).count();
        if (joinedCount >= 2) throw new ForbiddenException("You can only join up to 2 clubs");
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        club.getPendingMembers().add(new Club.PendingMember(rollNumber, student.getName(), LocalDateTime.now()));
        long daysSince = java.time.Duration.between(club.getCreatedAt(), LocalDateTime.now()).toDays();
        boolean earlyMember = daysSince <= 7;
        if (earlyMember) awardBadgeQuiet(club, rollNumber, "EARLY_MEMBER");
        String msg = "✅ You joined \"" + club.getTitle() + "\"! 2-day grace period started."
            + (earlyMember ? " 🌱 Early Member badge earned!" : "");
        notificationService.create(rollNumber, msg, "CLUB_JOIN");
        if (club.getPresidentRoll() != null)
            notificationService.create(club.getPresidentRoll(),
                "👋 " + student.getName() + " joined \"" + club.getTitle() + "\". 2 days to remove if needed.",
                "CLUB_JOIN");
        clubRepository.save(club);
        return mapToResponse(club);
    }

    public ClubResponse presidentRemoveMember(String clubId, String targetRoll, String presidentRoll) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!presidentRoll.equals(club.getPresidentRoll()))
            throw new ForbiddenException("Only the President can remove members");
        if (!club.isPending(targetRoll))
            throw new ForbiddenException("President can only remove pending members within grace period");
        club.getPendingMembers().removeIf(p -> p.getRollNumber().equals(targetRoll));
        notificationService.create(targetRoll,
            "❌ You were removed from \"" + club.getTitle() + "\" during grace period.", "CLUB_REMOVED");
        return mapToResponse(clubRepository.save(club));
    }

    public void confirmPendingMembers(Club club) {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(2);
        List<Club.PendingMember> toConfirm = club.getPendingMembers().stream()
            .filter(p -> p.getJoinedAt().isBefore(cutoff))
            .collect(Collectors.toList());
        for (Club.PendingMember p : toConfirm) {
            club.getMembers().add(p.getRollNumber());
            club.getPendingMembers().remove(p);
            notificationService.create(p.getRollNumber(),
                "🎉 You are now a confirmed member of \"" + club.getTitle() + "\"!", "CLUB_CONFIRMED");
        }
        if (!toConfirm.isEmpty()) clubRepository.save(club);
    }

    public ClubResponse requestRole(String clubId, String rollNumber, String role) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!club.isAnyMember(rollNumber))
            throw new ForbiddenException("You must be a member to request a role");
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        boolean already = club.getRoleRequests().stream()
            .anyMatch(r -> r.getRequestedBy().equals(rollNumber)
                && r.getRole().equals(role) && "PENDING".equals(r.getStatus()));
        if (already) throw new ForbiddenException("You already have a pending request for this role");
        club.getRoleRequests().add(new Club.RoleRequest(
            UUID.randomUUID().toString(), rollNumber, student.getName(), role, "PENDING", LocalDateTime.now()));
        studentRepository.findAll().stream()
            .filter(s -> { String r = s.getRole() != null ? s.getRole().toString() : ""; return r.equals("ADMIN") || r.equals("MODERATOR"); })
            .forEach(s -> notificationService.create(s.getRollNumber(),
                "📋 " + student.getName() + " requested " + role + " role in \"" + club.getTitle() + "\"",
                "CLUB_ROLE_REQUEST"));
        return mapToResponse(clubRepository.save(club));
    }

    // ─── ACTIVITY OPERATIONS ────────────────────────────────────────────────

    public ClubResponse addExtraActivity(String clubId, String title, String description, String rollNumber) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!rollNumber.equals(club.getPresidentRoll()))
            throw new ForbiddenException("Only the President can add extra activities");
        if (!club.isActivityUnlocked())
            throw new ForbiddenException("Activities unlock at 50% membership");
        if (club.getExtraActivities() >= MAX_EXTRA_ACTIVITIES)
            throw new ForbiddenException("Maximum " + MAX_EXTRA_ACTIVITIES + " extra activities allowed");
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        Club.ClubActivity a = new Club.ClubActivity();
        a.setId(UUID.randomUUID().toString());
        a.setTitle(title.trim());
        a.setDescription(description != null ? description.trim() : "");
        a.setAddedBy(rollNumber);
        a.setAddedByName(student.getName());
        a.setExtra(true);
        a.setAutoSeeded(false);
        a.setCompleted(false);
        a.setCreatedAt(LocalDateTime.now());
        a.setVotes(new ArrayList<>());
        club.getActivities().add(a);
        club.setExtraActivities(club.getExtraActivities() + 1);
        for (String roll : club.getMembers())
            if (!roll.equals(rollNumber))
                notificationService.create(roll, "📋 New activity in \"" + club.getTitle() + "\": " + title, "CLUB_ACTIVITY");
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse voteActivity(String clubId, String activityId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!club.isAnyMember(rollNumber)) throw new ForbiddenException("Only members can vote");
        Club.ClubActivity activity = club.getActivities().stream()
            .filter(a -> a.getId().equals(activityId)).findFirst()
            .orElseThrow(() -> new NotFoundException("Activity not found"));
        if (activity.getVotes().contains(rollNumber)) activity.getVotes().remove(rollNumber);
        else activity.getVotes().add(rollNumber);
        return mapToResponse(clubRepository.save(club));
    }
public ClubResponse completeActivity(String clubId, String activityId, String rollNumber) {
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    if (!rollNumber.equals(club.getPresidentRoll()))
        throw new ForbiddenException("Only the President can mark activities as complete");
 
    if (!club.isActivityUnlocked())
        throw new ForbiddenException("Activities locked until 50% members join");
 
    Club.ClubActivity activity = club.getActivities().stream()
        .filter(a -> a.getId().equals(activityId)).findFirst()
        .orElseThrow(() -> new NotFoundException("Activity not found"));
 
    if (activity.isCompleted())
        throw new ForbiddenException("Already completed");
 
    // ✅ must be at least 10 days old for president (admin bypasses via adminCompleteActivity)
    long daysOld = java.time.Duration.between(activity.getCreatedAt(), LocalDateTime.now()).toDays();
    if (daysOld < 10)
        throw new ForbiddenException(
            "This activity must be at least 10 days old before marking complete. " +
            (10 - daysOld) + " day(s) remaining."
        );
 
    activity.setCompleted(true);
    activity.setCompletedAt(LocalDateTime.now());
 
    long completedCount = club.getActivities().stream().filter(Club.ClubActivity::isCompleted).count();
 
    for (String roll : club.getMembers())
        notificationService.create(roll,
            "✅ \"" + activity.getTitle() + "\" completed! (" + completedCount + "/" + club.getActivities().size() + ")",
            "CLUB_ACTIVITY_DONE");
 
    if (completedCount == 5)
        for (String roll : club.getMembers()) awardBadge(club, roll, "ACTIVE_CONTRIBUTOR");
 
    return mapToResponse(clubRepository.save(club));
}


public ClubResponse adminUndoActivity(String clubId, String activityId, String adminRoll) {
    if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    club.getActivities().stream()
        .filter(a -> a.getId().equals(activityId) && a.isCompleted())
        .findFirst()
        .ifPresent(a -> {
            a.setCompleted(false);
            a.setCompletedAt(null);
        });
 
    return mapToResponse(clubRepository.save(club));
}

    // ─── PRESIDENT EDIT ──────────────────────────────────────────────────────

    public ClubResponse presidentEditClub(String clubId, String description, String rollNumber) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!rollNumber.equals(club.getPresidentRoll()))
            throw new ForbiddenException("Only the President can edit club details");
        if (club.getEditCount() >= MAX_EDIT_COUNT)
            throw new ForbiddenException("Maximum " + MAX_EDIT_COUNT + " edits allowed per semester");
        if (description != null && !description.trim().isEmpty()) {
            club.setDescription(description.trim());
            club.setEditCount(club.getEditCount() + 1);
        }
        return mapToResponse(clubRepository.save(club));
    }

    // ─── NICKNAME ────────────────────────────────────────────────────────────

    public ClubResponse setNickname(String clubId, String targetRoll, String nickname, String presidentRoll) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!presidentRoll.equals(club.getPresidentRoll()))
            throw new ForbiddenException("Only the President can set nicknames");
        if (!club.isAnyMember(targetRoll))
            throw new ForbiddenException("Student is not a member");
        if (nickname == null || nickname.trim().isEmpty()) {
            club.getMemberNicknames().remove(targetRoll);
        } else {
            String clean = nickname.trim();
            if (clean.length() > 20) throw new ForbiddenException("Nickname must be under 20 characters");
            if (!clean.matches("[a-zA-Z0-9 _-]+"))
                throw new ForbiddenException("Only letters, numbers, spaces, hyphens and underscores allowed");
            club.getMemberNicknames().put(targetRoll, clean);
        }
        return mapToResponse(clubRepository.save(club));
    }

    // ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────

    public ClubResponse addAnnouncement(String clubId, String title, String content, String rollNumber) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        boolean isLeader = rollNumber.equals(club.getPresidentRoll()) || rollNumber.equals(club.getVpRoll());
        if (!isLeader) throw new ForbiddenException("Only President or VP can post announcements");
        String dateKey = LocalDate.now() + ":" + rollNumber;
        int todayCount = club.getDailyAnnouncementCount().getOrDefault(dateKey, 0);
        if (todayCount >= MAX_DAILY_ANNOUNCEMENTS)
            throw new ForbiddenException("Maximum " + MAX_DAILY_ANNOUNCEMENTS + " announcements per day");
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        Club.ClubAnnouncement ann = new Club.ClubAnnouncement(
            UUID.randomUUID().toString(), title.trim(), content.trim(),
            rollNumber, student.getName(), false, LocalDateTime.now());
        club.getAnnouncements().add(0, ann);
        club.getDailyAnnouncementCount().put(dateKey, todayCount + 1);
        for (String roll : club.getMembers())
            if (!roll.equals(rollNumber))
                notificationService.create(roll, "📢 \"" + club.getTitle() + "\": " + title, "CLUB_ANNOUNCEMENT");
        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse pinAnnouncement(String clubId, String annId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found"));
        if (!rollNumber.equals(club.getPresidentRoll()))
            throw new ForbiddenException("Only President can pin announcements");
        club.getAnnouncements().forEach(a -> a.setPinned(a.getId().equals(annId) && !a.isPinned()));
        return mapToResponse(clubRepository.save(club));
    }

public ClubResponse deleteAnnouncement(String clubId, String annId, String adminRoll) {
    if (!isAdminOrMod(adminRoll)) throw new ForbiddenException("Only admin/moderator");
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
    club.getAnnouncements().removeIf(a -> a.getId().equals(annId));
    return mapToResponse(clubRepository.save(club));
}

    // ─── CHAT ────────────────────────────────────────────────────────────────

  public ClubResponse sendMessage(String clubId, String content, String rollNumber) {
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    // ✅ only confirmed members can chat — not pending
    if (!club.hasMember(rollNumber))
        throw new ForbiddenException("You must be a confirmed member to send messages. Please wait for your 2-day grace period to complete.");
 
    StudentProfile student = studentRepository.findByRollNumber(rollNumber)
        .orElseThrow(() -> new NotFoundException("Student not found"));
 
    Club.ClubMessage msg = new Club.ClubMessage(
        UUID.randomUUID().toString(), content.trim(),
        rollNumber, student.getName(), false, LocalDateTime.now());
 
    if (club.getMessages().size() >= MAX_CHAT_MESSAGES) club.getMessages().remove(0);
    club.getMessages().add(msg);
 
    return mapToResponse(clubRepository.save(club));
}

public ClubResponse deleteMessage(String clubId, String messageId, String rollNumber) {
    Club club = clubRepository.findById(clubId)
        .orElseThrow(() -> new NotFoundException("Club not found"));
 
    boolean isPresident = rollNumber.equals(club.getPresidentRoll());
    boolean isAdminUser = isAdminOrMod(rollNumber);
 
    // check ownership first
    Club.ClubMessage msg = club.getMessages().stream()
        .filter(m -> m.getId().equals(messageId))
        .findFirst()
        .orElseThrow(() -> new NotFoundException("Message not found"));
 
    if (!msg.getSenderRoll().equals(rollNumber) && !isPresident && !isAdminUser) {
        throw new ForbiddenException("You can only delete your own messages");
    }
 
    // ✅ actually remove from list — not soft delete
    club.getMessages().removeIf(m -> m.getId().equals(messageId));
 
    return mapToResponse(clubRepository.save(club));
}

    // ─── GETTERS ────────────────────────────────────────────────────────────

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll().stream()
            .peek(this::confirmPendingMembers)
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public ClubResponse getClub(String clubId) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));
        confirmPendingMembers(club);
        return mapToResponse(club);
    }

    public long getClubCount() { return clubRepository.count(); }

    // ─── BADGE HELPERS ───────────────────────────────────────────────────────

    private void awardBadge(Club club, String rollNumber, String badgeType) {
        boolean has = club.getBadges().stream()
            .anyMatch(b -> b.getRollNumber().equals(rollNumber) && b.getBadgeType().equals(badgeType));
        if (has) return;
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElse(null);
        club.getBadges().add(new Club.ClubBadge(rollNumber,
            s != null ? s.getName() : "Unknown", badgeType, LocalDateTime.now()));
        notificationService.create(rollNumber,
            "🏅 You earned the " + badgeType.replace("_", " ") + " badge in \"" + club.getTitle() + "\"!",
            "CLUB_BADGE");
    }

    private void awardBadgeQuiet(Club club, String rollNumber, String badgeType) {
        boolean has = club.getBadges().stream()
            .anyMatch(b -> b.getRollNumber().equals(rollNumber) && b.getBadgeType().equals(badgeType));
        if (has) return;
        StudentProfile s = studentRepository.findByRollNumber(rollNumber).orElse(null);
        club.getBadges().add(new Club.ClubBadge(rollNumber,
            s != null ? s.getName() : "Unknown", badgeType, LocalDateTime.now()));
    }

    private String getEmoji(String category) {
        if (category == null) return "🏛️";
        return switch (category) {
            case "AI"              -> "🤖";
            case "3D_PRINTING"    -> "🖨️";
            case "WEB_DEV"        -> "💻";
            case "ROBOTICS"       -> "🦾";
            case "ENTREPRENEURSHIP" -> "🚀";
            case "TECH_FEST"      -> "🎉";
            case "SPORTS"         -> "⚽";
            case "CULTURAL"       -> "🎭";
            case "TOASTMASTERS"   -> "🎤";
            case "PHOTOGRAPHY"    -> "📷";
            default               -> "🏛️";
        };
    }

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

        if (club.getPresidentRoll() != null)
            studentRepository.findByRollNumber(club.getPresidentRoll())
                .ifPresent(s -> res.setPresidentName(s.getName()));
        if (club.getVpRoll() != null)
            studentRepository.findByRollNumber(club.getVpRoll())
                .ifPresent(s -> res.setVpName(s.getName()));

        List<MemberInfo> memberDetails = new ArrayList<>();
        club.getMembers().stream().map(roll -> {
            StudentProfile s = studentRepository.findByRollNumber(roll).orElse(null);
            return new MemberInfo(roll, s != null ? s.getName() : "Unknown",
                s != null ? s.getYear() : "-", s != null ? s.getBranch() : "-", null);
        }).forEach(memberDetails::add);
        club.getPendingMembers().stream().map(p -> {
            StudentProfile s = studentRepository.findByRollNumber(p.getRollNumber()).orElse(null);
            return new MemberInfo(p.getRollNumber(), p.getName(),
                s != null ? s.getYear() : "-", s != null ? s.getBranch() : "-", null);
        }).forEach(memberDetails::add);
        res.setMemberDetails(memberDetails);

        res.setTotalActivities(club.getActivities().size());
        res.setCompletedActivities((int) club.getActivities().stream()
            .filter(Club.ClubActivity::isCompleted).count());

        String todayKey = LocalDate.now().toString();
        if (club.getPresidentRoll() != null)
            res.setPresidentAnnouncementsToday(club.getDailyAnnouncementCount()
                .getOrDefault(todayKey + ":" + club.getPresidentRoll(), 0));
        if (club.getVpRoll() != null)
            res.setVpAnnouncementsToday(club.getDailyAnnouncementCount()
                .getOrDefault(todayKey + ":" + club.getVpRoll(), 0));

        return res;
    }
}