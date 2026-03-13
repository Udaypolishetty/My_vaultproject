// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.CustomException.ForbiddenException;
// import com.example.PdfBackend.CustomException.NotFoundException;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
// import com.example.PdfBackend.model.Idea;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.IdeaRepository;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;

// @Service
// public class IdeaService {

//     private final IdeaRepository ideaRepository;
//     private final StudentProfileRepository studentProfileRepository;

//     public IdeaService(IdeaRepository ideaRepository, StudentProfileRepository studentProfileRepository) {
//         this.ideaRepository = ideaRepository;
//         this.studentProfileRepository = studentProfileRepository;
//     }

//     public List<Idea> getAllIdea() {
//         return ideaRepository.findAll();
//     }

//     public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));
                

//         if (ideaRepository.existsByTitle(request.getTitle())) {
//             throw new ForbiddenException("You already have an idea with this title");
//         }

//         Idea idea = new Idea();
//         idea.getId();
//         idea.setCategory(request.getCategory());
//         idea.setTitle(request.getTitle());
//         idea.setDescription(request.getDescription());
//         idea.setCreatedAt(LocalDateTime.now());
//         idea.setCreatedByName(student.getName());
//         idea.setCreatedByBranch(student.getBranch());
//         idea.setCreatedByYear(student.getYear());

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//         if (idea.getLikedBy().contains(rollNumber)) {
//             throw new ForbiddenException("You have already liked this idea");
//         }

//         idea.getLikedBy().add(rollNumber);
//         idea.setLikes(idea.getLikes() + 1);

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     // ✅ mapToResponse now includes comments
//     public IdeaResponse mapToResponse(Idea idea) {
//         return new IdeaResponse(
//                 idea.getId(),
//                 idea.getTitle(),
//                 idea.getCategory(),
//                 idea.getDescription(),
//                 idea.getCreatedAt(),
//                 idea.getCreatedByName(),
//                 idea.getCreatedByBranch(),
//                 idea.getCreatedByYear(),
//                 idea.getLikes(),
//                 idea.getLikedBy(),
//                 idea.getComments() != null ? idea.getComments() : new ArrayList<>() // ✅
//         );
//     }
// }

//working...
// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.CustomException.ForbiddenException;
// import com.example.PdfBackend.CustomException.NotFoundException;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
// import com.example.PdfBackend.model.Idea;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.IdeaRepository;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;

// @Service
// public class IdeaService {

//     private final IdeaRepository ideaRepository;
//     private final StudentProfileRepository studentProfileRepository;

//     public IdeaService(IdeaRepository ideaRepository, StudentProfileRepository studentProfileRepository) {
//         this.ideaRepository = ideaRepository;
//         this.studentProfileRepository = studentProfileRepository;
//     }

//     public List<Idea> getAllIdea() {
//         return ideaRepository.findAll();
//     }

//     public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

//         // ✅ one idea per day check
//         LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
//         LocalDateTime endOfDay = startOfDay.plusDays(1);

//         boolean alreadyPostedToday = ideaRepository.existsByCreatedByNameAndCreatedAtBetween(
//                 student.getName(), startOfDay, endOfDay
//         );

//         if (alreadyPostedToday) {
//             throw new ForbiddenException("You can only post one idea per day");
//         }

//         if (ideaRepository.existsByTitle(request.getTitle())) {
//             throw new ForbiddenException("An idea with this title already exists");
//         }

//         Idea idea = new Idea();
//         idea.setCategory(request.getCategory());
//         idea.setTitle(request.getTitle());
//         idea.setDescription(request.getDescription());
//         idea.setCreatedAt(LocalDateTime.now());
//         idea.setCreatedByName(student.getName());
//         idea.setCreatedByBranch(student.getBranch());
//         idea.setCreatedByYear(student.getYear());

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//         if (idea.getLikedBy().contains(rollNumber)) {
//             throw new ForbiddenException("You have already liked this idea");
//         }

//         idea.getLikedBy().add(rollNumber);
//         idea.setLikes(idea.getLikes() + 1);

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse mapToResponse(Idea idea) {
//         return new IdeaResponse(
//                 idea.getId(),
//                 idea.getTitle(),
//                 idea.getCategory(),
//                 idea.getDescription(),
//                 idea.getCreatedAt(),
//                 idea.getCreatedByName(),
//                 idea.getCreatedByBranch(),
//                 idea.getCreatedByYear(),
//                 idea.getLikes(),
//                 idea.getLikedBy(),
//                 idea.getComments() != null ? idea.getComments() : new ArrayList<>()
//         );
//     }
// }

//new mallu

// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.CustomException.ForbiddenException;
// import com.example.PdfBackend.CustomException.NotFoundException;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
// import com.example.PdfBackend.model.Idea;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.IdeaRepository;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;

// @Service
// public class IdeaService {

//     private final IdeaRepository ideaRepository;
//     private final StudentProfileRepository studentProfileRepository;
//     private final NotificationService notificationService;
//     private final StudentProfileRepository studentRepository;

//     public IdeaService(IdeaRepository ideaRepository, StudentProfileRepository studentProfileRepository) {
//         this.ideaRepository = ideaRepository;
//         this.studentProfileRepository = studentProfileRepository;
//     }

//     public List<Idea> getAllIdea() {
//         return ideaRepository.findAll();
//     }

//     public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

//         // ✅ one idea per day check
//         // LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
//         // LocalDateTime endOfDay = startOfDay.plusDays(1);

//         // boolean alreadyPostedToday = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
//         //         student.getId(), startOfDay, endOfDay
//         // );

//         // if (alreadyPostedToday) {
//         //     throw new ForbiddenException("You can only post one idea per day");
//         // }
//         // ✅ 48 hour cooldown — stored in DB, cannot be bypassed
//             LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
//             LocalDateTime now = LocalDateTime.now();

//             boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
//                     student.getId(), cutoff, now
//             );

//             if (alreadyPostedRecently) {
//                 throw new ForbiddenException("You can only post one idea every 48 hours");
//             }

//         if (ideaRepository.existsByTitle(request.getTitle())) {
//             throw new ForbiddenException("An idea with this title already exists");
//         }

//         Idea idea = new Idea();
//         idea.setCategory(request.getCategory());
//         idea.setTitle(request.getTitle());
//         idea.setDescription(request.getDescription());
//         idea.setCreatedAt(LocalDateTime.now());
//         idea.setCreatedByName(student.getName());
//         idea.setCreatedByBranch(student.getBranch());
//         idea.setCreatedByYear(student.getYear());
//         idea.setCreatedById(student.getId());       // ✅ added
//         idea.setCreatedByEmail(student.getEmail()); // ✅ added

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//         if (idea.getLikedBy().contains(rollNumber)) {
//             throw new ForbiddenException("You have already liked this idea");
//         }

//         idea.getLikedBy().add(rollNumber);
//         idea.setLikes(idea.getLikes() + 1);

//         return mapToResponse(ideaRepository.save(idea));
//         StudentProfile liker = studentRepository.findByRollNumber(likerRollNumber)
//     .orElseThrow(() -> new RuntimeException("Student not found"));

// notificationService.create(
//     idea.getCreatedByRollNumber(), // idea owner
//     liker.getName() + " liked your idea \"" + idea.getTitle() + "\"",
//     "IDEA_LIKE"
// );
//     }

//     public IdeaResponse mapToResponse(Idea idea) {
//         return new IdeaResponse(
//                 idea.getId(),
//                 idea.getTitle(),
//                 idea.getCategory(),
//                 idea.getDescription(),
//                 idea.getCreatedAt(),
//                 idea.getCreatedByName(),
//                 idea.getCreatedByBranch(),
//                 idea.getCreatedByYear(),
//                 idea.getLikes(),
//                 idea.getLikedBy(),
//                 idea.getComments() != null ? idea.getComments() : new ArrayList<>()
//         );
//     }
// }


// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.CustomException.ForbiddenException;
// import com.example.PdfBackend.CustomException.NotFoundException;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
// import com.example.PdfBackend.model.Idea;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.IdeaRepository;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;


// @Service
// public class IdeaService {

//     private final IdeaRepository ideaRepository;
//     private final StudentProfileRepository studentProfileRepository;
//     private final NotificationService notificationService;

//     public IdeaService(
//         IdeaRepository ideaRepository,
//         StudentProfileRepository studentProfileRepository,
//         NotificationService notificationService
//     ) {
//         this.ideaRepository = ideaRepository;
//         this.studentProfileRepository = studentProfileRepository;
//         this.notificationService = notificationService;
//     }

//     public List<Idea> getAllIdea() {
//         return ideaRepository.findAll();
//     }

//     public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

//         LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
//         LocalDateTime now = LocalDateTime.now();

//         boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
//                 student.getId(), cutoff, now
//         );

//         if (alreadyPostedRecently) {
//             throw new ForbiddenException("You can only post one idea every 48 hours");
//         }

//         if (ideaRepository.existsByTitle(request.getTitle())) {
//             throw new ForbiddenException("An idea with this title already exists");
//         }

//         Idea idea = new Idea();
//         idea.setCategory(request.getCategory());
//         idea.setTitle(request.getTitle());
//         idea.setDescription(request.getDescription());
//         idea.setCreatedAt(LocalDateTime.now());
//         idea.setCreatedByName(student.getName());
//         idea.setCreatedByBranch(student.getBranch());
//         idea.setCreatedByYear(student.getYear());
//         idea.setCreatedById(student.getId());
//         idea.setCreatedByEmail(student.getEmail());
//         idea.setCreatedByRollNumber(rollNumber); // ✅ needed for like notification

//         return mapToResponse(ideaRepository.save(idea));
//     }

//    public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//     Idea idea = ideaRepository.findById(ideaId)
//             .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//     if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//     if (idea.getLikedBy().contains(rollNumber)) {
//         throw new ForbiddenException("You have already liked this idea");
//     }

//     idea.getLikedBy().add(rollNumber);
//     idea.setLikes(idea.getLikes() + 1);

//     IdeaResponse response = mapToResponse(ideaRepository.save(idea));

//     // ✅ notify only at milestones — not every like
//     try {
//         if (idea.getCreatedByRollNumber() != null &&
//             !idea.getCreatedByRollNumber().equals(rollNumber)) {

//             int likes = idea.getLikes();

//             if (likes == 5 || likes == 10 || likes == 25 || likes == 50) {

//                 notificationService.create(
//                     idea.getCreatedByRollNumber(),
//                     "🎉 Your idea \"" + idea.getTitle() + "\" reached " + likes + " likes!",
//                     "IDEA_LIKE"
//                 );
//             }
//         }
//     } catch (Exception e) {
//         System.err.println("Notification failed: " + e.getMessage());
//     }

//     return response;
// }
//     public IdeaResponse mapToResponse(Idea idea) {
//         return new IdeaResponse(
//                 idea.getId(),
//                 idea.getTitle(),
//                 idea.getCategory(),
//                 idea.getDescription(),
//                 idea.getCreatedAt(),
//                 idea.getCreatedByName(),
//                 idea.getCreatedByBranch(),
//                 idea.getCreatedByYear(),
//                 idea.getLikes(),
//                 idea.getLikedBy(),
//                 idea.getComments() != null ? idea.getComments() : new ArrayList<>()
//         );
//     }
//     public void deleteIdea(String ideaId, String rollNumber) {
//     Idea idea = ideaRepository.findById(ideaId)
//             .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//     if (!rollNumber.equals(idea.getCreatedByRollNumber())) {
//         throw new ForbiddenException("You can only delete your own ideas");
//     }

//     ideaRepository.deleteById(ideaId);
// }

// public Optional<Idea> getIdeaById(String id) {
//     return ideaRepository.findById(id);
// }
// }


// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.CustomException.ForbiddenException;
// import com.example.PdfBackend.CustomException.NotFoundException;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
// import com.example.PdfBackend.model.Idea;
// import com.example.PdfBackend.model.Role;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.IdeaRepository;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// @Service
// public class IdeaService {

//     private final IdeaRepository ideaRepository;
//     private final StudentProfileRepository studentProfileRepository;
//     private final NotificationService notificationService;

//     public IdeaService(
//         IdeaRepository ideaRepository,
//         StudentProfileRepository studentProfileRepository,
//         NotificationService notificationService
//     ) {
//         this.ideaRepository = ideaRepository;
//         this.studentProfileRepository = studentProfileRepository;
//         this.notificationService = notificationService;
//     }

//     public List<Idea> getAllIdea() {
//         return ideaRepository.findAll();
//     }

//     public Optional<Idea> getIdeaById(String id) {
//         return ideaRepository.findById(id);
//     }

//     public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));
//     }
//                  // ✅ admin can delete any idea, student can only delete their own
//     boolean isAdmin = student.getRole() == Role.ADMIN;
//     boolean isOwner = rollNumber.equals(idea.getCreatedByRollNumber());

//     if (!isAdmin && !isOwner) {
//         throw new ForbiddenException("You can only delete your own ideas");
//     }

//     ideaRepository.deleteById(ideaId);


//         LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
//         LocalDateTime now = LocalDateTime.now();

//         boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
//                 student.getId(), cutoff, now
//         );

//         if (alreadyPostedRecently) {
//             throw new ForbiddenException("You can only post one idea every 48 hours");
//         }

//         if (ideaRepository.existsByTitle(request.getTitle())) {
//             throw new ForbiddenException("An idea with this title already exists");
//         }

//         Idea idea = new Idea();
//         idea.setCategory(request.getCategory());
//         idea.setTitle(request.getTitle());
//         idea.setDescription(request.getDescription());
//         idea.setCreatedAt(LocalDateTime.now());
//         idea.setCreatedByName(student.getName());
//         idea.setCreatedByBranch(student.getBranch());
//         idea.setCreatedByYear(student.getYear());
//         idea.setCreatedById(student.getId());
//         idea.setCreatedByEmail(student.getEmail());
//         idea.setCreatedByRollNumber(rollNumber);
//         idea.setStatus("OPEN"); // ✅ default status

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//         if (idea.getLikedBy().contains(rollNumber)) {
//             throw new ForbiddenException("You have already liked this idea");
//         }

//         idea.getLikedBy().add(rollNumber);
//         idea.setLikes(idea.getLikes() + 1);

//         IdeaResponse response = mapToResponse(ideaRepository.save(idea));

//         try {
//             int likes = idea.getLikes();

//             // ✅ notify idea owner at milestones
//             if (idea.getCreatedByRollNumber() != null &&
//                 !idea.getCreatedByRollNumber().equals(rollNumber)) {

//                 if (likes == 5 || likes == 10 || likes == 25 || likes == 50) {
//                     notificationService.create(
//                         idea.getCreatedByRollNumber(),
//                         "🎉 Your idea \"" + idea.getTitle() + "\" reached " + likes + " likes!",
//                         "IDEA_LIKE"
//                     );
//                 }
//             }

//             // ✅ Phase 2 — notify ALL moderators + admin at 15 likes
//             if (likes == 15) {
//                 List<StudentProfile> moderatorsAndAdmins = studentProfileRepository.findAll()
//                     .stream()
//                     .filter(s -> s.getRole() == Role.MODERATOR || s.getRole() == Role.ADMIN)
//                     .toList();

//                 for (StudentProfile mod : moderatorsAndAdmins) {
//                     notificationService.create(
//                         mod.getRollNumber(),
//                         "💡 Idea \"" + idea.getTitle() + "\" has reached 15 likes — consider reviewing it!",
//                         "IDEA_REVIEW"
//                     );
//                 }
//             }

//         } catch (Exception e) {
//             System.err.println("Notification failed: " + e.getMessage());
//         }

//         return response;
//     }

//     // ✅ Phase 2 — update idea status by moderator/admin
//     public IdeaResponse updateStatus(String ideaId, String status, String moderatorNote, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         StudentProfile moderator = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Moderator not found: " + rollNumber));

//         // ✅ only moderator or admin can update status
//         if (moderator.getRole() != Role.MODERATOR && moderator.getRole() != Role.ADMIN) {
//             throw new ForbiddenException("Only moderators and admins can update idea status");
//         }

//         String oldStatus = idea.getStatus();
//         idea.setStatus(status);
//         idea.setModeratorNote(moderatorNote);
//         idea.setReviewedBy(moderator.getName());
//         idea.setReviewedAt(LocalDateTime.now());

//         ideaRepository.save(idea);

//         // ✅ notify idea owner about status change
//         try {
//             if (idea.getCreatedByRollNumber() != null) {
//                 String message = switch (status) {
//                     case "UNDER_REVIEW" -> "🔍 Your idea \"" + idea.getTitle() + "\" is now Under Review by " + moderator.getName() + "!";
//                     case "IMPLEMENTED"  -> "✅ Your idea \"" + idea.getTitle() + "\" has been Implemented! Great work!";
//                     case "ON_HOLD"      -> "⏸ Your idea \"" + idea.getTitle() + "\" is On Hold. Note: " + (moderatorNote != null ? moderatorNote : "No reason provided");
//                     case "REJECTED"     -> "❌ Your idea \"" + idea.getTitle() + "\" was not accepted. Reason: " + (moderatorNote != null ? moderatorNote : "No reason provided");
//                     default -> null;
//                 };

//                 if (message != null) {
//                     notificationService.create(
//                         idea.getCreatedByRollNumber(),
//                         message,
//                         "IDEA_STATUS"
//                     );
//                 }
//             }
//         } catch (Exception e) {
//             System.err.println("Status notification failed: " + e.getMessage());
//         }

//         return mapToResponse(idea);
//     }

//     public IdeaResponse mapToResponse(Idea idea) {
//         IdeaResponse response = new IdeaResponse();
//         response.setId(idea.getId());
//         response.setTitle(idea.getTitle());
//         response.setCategory(idea.getCategory());
//         response.setDescription(idea.getDescription());
//         response.setCreatedAt(idea.getCreatedAt());
//         response.setCreatedByName(idea.getCreatedByName());
//         response.setCreatedByBranch(idea.getCreatedByBranch());
//         response.setCreatedByYear(idea.getCreatedByYear());
//         response.setLikes(idea.getLikes());
//         response.setLikedBy(idea.getLikedBy());
//         response.setComments(idea.getComments() != null ? idea.getComments() : new ArrayList<>());
//         // ✅ new status fields
//         response.setStatus(idea.getStatus() != null ? idea.getStatus() : "OPEN");
//         response.setModeratorNote(idea.getModeratorNote());
//         response.setReviewedBy(idea.getReviewedBy());
//         response.setReviewedAt(idea.getReviewedAt());
//         return response;
//     }

//     public void deleteIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (!rollNumber.equals(idea.getCreatedByRollNumber())) {
//             throw new ForbiddenException("You can only delete your own ideas");
//         }

//         ideaRepository.deleteById(ideaId);
//     }
// }




// package com.example.PdfBackend.Service;

// import com.example.PdfBackend.CustomException.ForbiddenException;
// import com.example.PdfBackend.CustomException.NotFoundException;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
// import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
// import com.example.PdfBackend.model.Idea;
// import com.example.PdfBackend.model.Role;
// import com.example.PdfBackend.model.StudentProfile;
// import com.example.PdfBackend.repository.IdeaRepository;
// import com.example.PdfBackend.repository.StudentProfileRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// @Service
// public class IdeaService {

//     private final IdeaRepository ideaRepository;
//     private final StudentProfileRepository studentProfileRepository;
//     private final NotificationService notificationService;

//     public IdeaService(
//         IdeaRepository ideaRepository,
//         StudentProfileRepository studentProfileRepository,
//         NotificationService notificationService
//     ) {
//         this.ideaRepository = ideaRepository;
//         this.studentProfileRepository = studentProfileRepository;
//         this.notificationService = notificationService;
//     }

//     public List<Idea> getAllIdea() {
//         return ideaRepository.findAll();
//     }

//     public Optional<Idea> getIdeaById(String id) {
//         return ideaRepository.findById(id);
//     }

//     public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

//         LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
//         LocalDateTime now = LocalDateTime.now();

//         boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
//                 student.getId(), cutoff, now
//         );

//         if (alreadyPostedRecently) {
//             throw new ForbiddenException("You can only post one idea every 48 hours");
//         }

//         if (ideaRepository.existsByTitle(request.getTitle())) {
//             throw new ForbiddenException("An idea with this title already exists");
//         }

//         Idea idea = new Idea();
//         idea.setCategory(request.getCategory());
//         idea.setTitle(request.getTitle());
//         idea.setDescription(request.getDescription());
//         idea.setCreatedAt(LocalDateTime.now());
//         idea.setCreatedByName(student.getName());
//         idea.setCreatedByBranch(student.getBranch());
//         idea.setCreatedByYear(student.getYear());
//         idea.setCreatedById(student.getId());
//         idea.setCreatedByEmail(student.getEmail());
//         idea.setCreatedByRollNumber(rollNumber);
//         idea.setStatus("OPEN");

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//         if (idea.getLikedBy().contains(rollNumber)) {
//             throw new ForbiddenException("You have already liked this idea");
//         }

//         idea.getLikedBy().add(rollNumber);
//         idea.setLikes(idea.getLikes() + 1);

//         IdeaResponse response = mapToResponse(ideaRepository.save(idea));

//         try {
//             int likes = idea.getLikes();

//             if (idea.getCreatedByRollNumber() != null &&
//                 !idea.getCreatedByRollNumber().equals(rollNumber)) {

//                 if (likes == 5 || likes == 10 || likes == 25 || likes == 50) {
//                     notificationService.create(
//                         idea.getCreatedByRollNumber(),
//                         "🎉 Your idea \"" + idea.getTitle() + "\" reached " + likes + " likes!",
//                         "IDEA_LIKE"
//                     );
//                 }
//             }

//             if (likes == 15) {
//                 List<StudentProfile> moderatorsAndAdmins = studentProfileRepository.findAll()
//                     .stream()
//                     .filter(s -> s.getRole() == Role.MODERATOR || s.getRole() == Role.ADMIN)
//                     .toList();

//                 for (StudentProfile mod : moderatorsAndAdmins) {
//                     notificationService.create(
//                         mod.getRollNumber(),
//                         "💡 Idea \"" + idea.getTitle() + "\" has reached 15 likes — consider reviewing it!",
//                         "IDEA_REVIEW"
//                     );
//                 }
//             }

//         } catch (Exception e) {
//             System.err.println("Notification failed: " + e.getMessage());
//         }

//         return response;
//     }

//     public IdeaResponse updateStatus(String ideaId, String status, String moderatorNote, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         StudentProfile moderator = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Moderator not found: " + rollNumber));

//         if (moderator.getRole() != Role.MODERATOR && moderator.getRole() != Role.ADMIN) {
//             throw new ForbiddenException("Only moderators and admins can update idea status");
//         }

//         idea.setStatus(status);
//         idea.setModeratorNote(moderatorNote);
//         idea.setReviewedBy(moderator.getName());
//         idea.setReviewedAt(LocalDateTime.now());

//         ideaRepository.save(idea);

//         try {
//             if (idea.getCreatedByRollNumber() != null) {
//                 String message = switch (status) {
//                     case "UNDER_REVIEW" -> "🔍 Your idea \"" + idea.getTitle() + "\" is now Under Review by " + moderator.getName() + "!";
//                     case "IMPLEMENTED"  -> "✅ Your idea \"" + idea.getTitle() + "\" has been Implemented! Great work!";
//                     case "ON_HOLD"      -> "⏸ Your idea \"" + idea.getTitle() + "\" is On Hold. Note: " + (moderatorNote != null ? moderatorNote : "No reason provided");
//                     case "REJECTED"     -> "❌ Your idea \"" + idea.getTitle() + "\" was not accepted. Reason: " + (moderatorNote != null ? moderatorNote : "No reason provided");
//                     default -> null;
//                 };

//                 if (message != null) {
//                     notificationService.create(
//                         idea.getCreatedByRollNumber(),
//                         message,
//                         "IDEA_STATUS"
//                     );
//                 }
//             }
//         } catch (Exception e) {
//             System.err.println("Status notification failed: " + e.getMessage());
//         }

//         return mapToResponse(idea);
//     }

//     public IdeaResponse mapToResponse(Idea idea) {
//         IdeaResponse response = new IdeaResponse();
//         response.setId(idea.getId());
//         response.setTitle(idea.getTitle());
//         response.setCategory(idea.getCategory());
//         response.setDescription(idea.getDescription());
//         response.setCreatedAt(idea.getCreatedAt());
//         response.setCreatedByName(idea.getCreatedByName());
//         response.setCreatedByBranch(idea.getCreatedByBranch());
//         response.setCreatedByYear(idea.getCreatedByYear());
//         response.setLikes(idea.getLikes());
//         response.setLikedBy(idea.getLikedBy());
//         response.setComments(idea.getComments() != null ? idea.getComments() : new ArrayList<>());
//         response.setStatus(idea.getStatus() != null ? idea.getStatus() : "OPEN");
//         response.setModeratorNote(idea.getModeratorNote());
//         response.setReviewedBy(idea.getReviewedBy());
//         response.setReviewedAt(idea.getReviewedAt());
//         return response;
//     }

//     // ✅ admin can delete any idea, student can only delete their own
//     public void deleteIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
//                 .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

//         boolean isAdmin = student.getRole() == Role.ADMIN;
//         boolean isOwner = rollNumber.equals(idea.getCreatedByRollNumber());

//         if (!isAdmin && !isOwner) {
//             throw new ForbiddenException("You can only delete your own ideas");
//         }

//         ideaRepository.deleteById(ideaId);
//     }
// }



package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.model.Role;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.IdeaRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final NotificationService notificationService;

    public IdeaService(
            IdeaRepository ideaRepository,
            StudentProfileRepository studentProfileRepository,
            NotificationService notificationService
    ) {
        this.ideaRepository = ideaRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.notificationService = notificationService;
    }

    public List<Idea> getAllIdea() {
        return ideaRepository.findAll();
    }

    public Optional<Idea> getIdeaById(String id) {
        return ideaRepository.findById(id);
    }

    public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

        LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
        LocalDateTime now = LocalDateTime.now();

        boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
                student.getId(), cutoff, now
        );

        if (alreadyPostedRecently) {
            throw new ForbiddenException("You can only post one idea every 48 hours");
        }

        if (ideaRepository.existsByTitle(request.getTitle())) {
            throw new ForbiddenException("An idea with this title already exists");
        }

        Idea idea = new Idea();
        idea.setCategory(request.getCategory());
        idea.setTitle(request.getTitle());
        idea.setDescription(request.getDescription());
        idea.setCreatedAt(LocalDateTime.now());
        idea.setCreatedByName(student.getName());
        idea.setCreatedByBranch(student.getBranch());
        idea.setCreatedByYear(student.getYear());
        idea.setCreatedById(student.getId());
        idea.setCreatedByEmail(student.getEmail());
        idea.setCreatedByRollNumber(rollNumber);
        idea.setStatus("OPEN");

        return mapToResponse(ideaRepository.save(idea));
    }

    public IdeaResponse likeIdea(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

       if (idea.getLikedBy().contains(rollNumber)) {
    // ✅ UNLIKING — just remove, no notification
    idea.getLikedBy().remove(rollNumber);
    idea.setLikes(idea.getLikes() - 1);
} else {
    // ✅ LIKING — add and check milestones
    idea.getLikedBy().add(rollNumber);
    idea.setLikes(idea.getLikes() + 1);

    int newCount = idea.getLikes();
    if (newCount == 5 || newCount == 10 || newCount == 25 || newCount == 50) {
        notificationService.create(
            idea.getCreatedByRollNumber(),
            "🎉 Your idea \"" + idea.getTitle() + "\" reached " + newCount + " likes!",
            "LIKE_MILESTONE"
        );
    }
}

        IdeaResponse response = mapToResponse(ideaRepository.save(idea));

        try {
            int likes = idea.getLikes();

            if (idea.getCreatedByRollNumber() != null &&
                    !idea.getCreatedByRollNumber().equals(rollNumber)) {

                if (likes == 5 || likes == 10 || likes == 25 || likes == 50) {
                    notificationService.create(
                            idea.getCreatedByRollNumber(),
                            "🎉 Your idea \"" + idea.getTitle() + "\" reached " + likes + " likes!",
                            "IDEA_LIKE"
                    );
                }
            }

            if (likes == 15) {
                List<StudentProfile> moderatorsAndAdmins = studentProfileRepository.findAll()
                        .stream()
                        .filter(s -> s.getRole() == Role.MODERATOR || s.getRole() == Role.ADMIN)
                        .toList();

                for (StudentProfile mod : moderatorsAndAdmins) {
                    notificationService.create(
                            mod.getRollNumber(),
                            "💡 Idea \"" + idea.getTitle() + "\" has reached 15 likes — consider reviewing it!",
                            "IDEA_REVIEW"
                    );
                }
            }

        } catch (Exception e) {
            System.err.println("Notification failed: " + e.getMessage());
        }

        return response;
    }

    public IdeaResponse updateStatus(String ideaId, String status, String moderatorNote, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        StudentProfile moderator = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Moderator not found: " + rollNumber));

        if (moderator.getRole() != Role.MODERATOR && moderator.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Only moderators and admins can update idea status");
        }

        idea.setStatus(status);
        idea.setModeratorNote(moderatorNote);
        idea.setReviewedBy(moderator.getName());
        idea.setReviewedAt(LocalDateTime.now());

        ideaRepository.save(idea);

        try {
            if (idea.getCreatedByRollNumber() != null) {
                String message = switch (status) {
                    case "UNDER_REVIEW" -> "🔍 Your idea \"" + idea.getTitle() + "\" is now Under Review by " + moderator.getName() + "!";
                    case "IMPLEMENTED"  -> "✅ Your idea \"" + idea.getTitle() + "\" has been Implemented! Great work!";
                    case "ON_HOLD"      -> "⏸ Your idea \"" + idea.getTitle() + "\" is On Hold. Note: " + (moderatorNote != null ? moderatorNote : "No reason provided");
                    case "REJECTED"     -> "❌ Your idea \"" + idea.getTitle() + "\" was not accepted. Reason: " + (moderatorNote != null ? moderatorNote : "No reason provided");
                    default -> null;
                };

                if (message != null) {
                    notificationService.create(
                            idea.getCreatedByRollNumber(),
                            message,
                            "IDEA_STATUS"
                    );
                }
            }
        } catch (Exception e) {
            System.err.println("Status notification failed: " + e.getMessage());
        }

        return mapToResponse(idea);
    }

    public IdeaResponse mapToResponse(Idea idea) {
        IdeaResponse response = new IdeaResponse();
        response.setId(idea.getId());
        response.setTitle(idea.getTitle());
        response.setCategory(idea.getCategory());
        response.setDescription(idea.getDescription());
        response.setCreatedAt(idea.getCreatedAt());
        response.setCreatedByName(idea.getCreatedByName());
        response.setCreatedByBranch(idea.getCreatedByBranch());
        response.setCreatedByYear(idea.getCreatedByYear());
        response.setCreatedById(idea.getCreatedById());
        response.setCreatedByEmail(idea.getCreatedByEmail());
        response.setLikes(idea.getLikes());
        response.setLikedBy(idea.getLikedBy());
        response.setComments(idea.getComments() != null ? idea.getComments() : new ArrayList<>());
        response.setStatus(idea.getStatus() != null ? idea.getStatus() : "OPEN");
        response.setModeratorNote(idea.getModeratorNote());
        response.setReviewedBy(idea.getReviewedBy());
        response.setReviewedAt(idea.getReviewedAt());
        return response;
    }

    // ✅ admin can delete any idea, student can only delete their own
    public void deleteIdea(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        boolean isAdmin = student.getRole() == Role.ADMIN;
        boolean isOwner = rollNumber.equals(idea.getCreatedByRollNumber());

        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("You can only delete your own ideas");
        }

        ideaRepository.deleteById(ideaId);
    }

    // in getAllIdeas() — students never see archived ideas
public List<IdeaResponse> getAllIdeas() {
    return ideaRepository.findAll()
        .stream()
        .filter(i -> !i.isArchived())
        .map(this::mapToResponse)
        .collect(Collectors.toList());
}

public List<IdeaResponse> getArchivedIdeas() {
    return ideaRepository.findAll()
        .stream()
        .filter(Idea::isArchived)
        .map(this::mapToResponse)
        .collect(Collectors.toList());
}
}
