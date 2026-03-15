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
// import java.util.stream.Collectors;

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
//             IdeaRepository ideaRepository,
//             StudentProfileRepository studentProfileRepository,
//             NotificationService notificationService
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
//             idea.getLikedBy().remove(rollNumber);
//             idea.setLikes(idea.getLikes() - 1);
//         } else {
//             idea.getLikedBy().add(rollNumber);
//             idea.setLikes(idea.getLikes() + 1);

//             int newCount = idea.getLikes();
//             if (newCount == 5 || newCount == 10 || newCount == 25 || newCount == 50) {
//                 notificationService.create(
//                     idea.getCreatedByRollNumber(),
//                     "🎉 Your idea \"" + idea.getTitle() + "\" reached " + newCount + " likes!",
//                     "LIKE_MILESTONE"
//                 );
//             }
//         }

//         IdeaResponse response = mapToResponse(ideaRepository.save(idea));

//         try {
//             int likes = idea.getLikes();

//             if (idea.getCreatedByRollNumber() != null &&
//                     !idea.getCreatedByRollNumber().equals(rollNumber)) {

//                 if (likes == 5 || likes == 10 || likes == 25 || likes == 50) {
//                     notificationService.create(
//                             idea.getCreatedByRollNumber(),
//                             "🎉 Your idea \"" + idea.getTitle() + "\" reached " + likes + " likes!",
//                             "IDEA_LIKE"
//                     );
//                 }
//             }

//             if (likes == 15) {
//                 List<StudentProfile> moderatorsAndAdmins = studentProfileRepository.findAll()
//                         .stream()
//                         .filter(s -> s.getRole() == Role.MODERATOR || s.getRole() == Role.ADMIN)
//                         .toList();

//                 for (StudentProfile mod : moderatorsAndAdmins) {
//                     notificationService.create(
//                             mod.getRollNumber(),
//                             "💡 Idea \"" + idea.getTitle() + "\" has reached 15 likes — consider reviewing it!",
//                             "IDEA_REVIEW"
//                     );
//                 }
//             }

//         } catch (Exception e) {
//             System.err.println("Notification failed: " + e.getMessage());
//         }

//         return response;
//     }

//     public IdeaResponse updateStatus(String ideaId, String status, String moderatorNote,
//                                      String rollNumber, String showcaseImageUrl) {
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

//         // ✅ save showcase image only when IMPLEMENTED
//         if ("IMPLEMENTED".equals(status) && showcaseImageUrl != null && !showcaseImageUrl.isBlank()) {
//             idea.setShowcaseImageUrl(showcaseImageUrl);
//         }

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
//                             idea.getCreatedByRollNumber(),
//                             message,
//                             "IDEA_STATUS"
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
//         response.setCreatedById(idea.getCreatedById());
//         response.setCreatedByEmail(idea.getCreatedByEmail());
//         response.setLikes(idea.getLikes());
//         response.setLikedBy(idea.getLikedBy());
//         response.setComments(idea.getComments() != null ? idea.getComments() : new ArrayList<>());
//         response.setStatus(idea.getStatus() != null ? idea.getStatus() : "OPEN");
//         response.setModeratorNote(idea.getModeratorNote());
//         response.setReviewedBy(idea.getReviewedBy());
//         response.setReviewedAt(idea.getReviewedAt());
//         response.setShowcaseImageUrl(idea.getShowcaseImageUrl()); // ✅
//         return response;
//     }

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

//     public List<IdeaResponse> getAllIdeas() {
//         return ideaRepository.findAll()
//             .stream()
//             .filter(i -> !i.isArchived())
//             .map(this::mapToResponse)
//             .collect(Collectors.toList());
//     }

//     public List<IdeaResponse> getArchivedIdeas() {
//         return ideaRepository.findAll()
//             .stream()
//             .filter(Idea::isArchived)
//             .map(this::mapToResponse)
//             .collect(Collectors.toList());
//     }

//     public List<Idea> getLeaderboard() {
//         return ideaRepository.findAll().stream()
//             .filter(idea -> {
//                 if (!idea.isArchived()) return true;
//                 return "IMPLEMENTED".equals(idea.getStatus()) && idea.getLikes() > 5;
//             })
//             .sorted((a, b) -> {
//                 boolean aImpl = "IMPLEMENTED".equals(a.getStatus());
//                 boolean bImpl = "IMPLEMENTED".equals(b.getStatus());
//                 if (aImpl && !bImpl) return -1;
//                 if (!aImpl && bImpl) return 1;

//                 boolean aRej = "REJECTED".equals(a.getStatus());
//                 boolean bRej = "REJECTED".equals(b.getStatus());
//                 if (aRej && !bRej) return 1;
//                 if (!aRej && bRej) return -1;

//                 int likesDiff = b.getLikes() - a.getLikes();
//                 if (likesDiff != 0) return likesDiff;

//                 int commentsDiff = (b.getComments() != null ? b.getComments().size() : 0)
//                                  - (a.getComments() != null ? a.getComments().size() : 0);
//                 if (commentsDiff != 0) return commentsDiff;

//                 return b.getCreatedAt().compareTo(a.getCreatedAt());
//             })
//             .limit(10)
//             .collect(Collectors.toList());
//     }

//     // ✅ showcase — only IMPLEMENTED ideas, with image first
//     public List<Idea> getShowcase() {
//         return ideaRepository.findAll().stream()
//             .filter(idea -> "IMPLEMENTED".equals(idea.getStatus()))
//             .sorted((a, b) -> {
//                 // ideas with images come first
//                 boolean aHasImg = a.getShowcaseImageUrl() != null && !a.getShowcaseImageUrl().isBlank();
//                 boolean bHasImg = b.getShowcaseImageUrl() != null && !b.getShowcaseImageUrl().isBlank();
//                 if (aHasImg && !bHasImg) return -1;
//                 if (!aHasImg && bHasImg) return 1;
//                 return b.getLikes() - a.getLikes();
//             })
//             .limit(6)
//             .collect(Collectors.toList());
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
// import java.util.stream.Collectors;

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
//             IdeaRepository ideaRepository,
//             StudentProfileRepository studentProfileRepository,
//             NotificationService notificationService
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

//         if (request.isClassProposal() &&
//                 student.getRole() != Role.MODERATOR && student.getRole() != Role.ADMIN) {
//             throw new ForbiddenException("Only moderators can post class proposals");
//         }

//         LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
//         LocalDateTime now = LocalDateTime.now();

//         if (!request.isClassProposal()) {
//             boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
//                     student.getId(), cutoff, now
//             );
//             if (alreadyPostedRecently) {
//                 throw new ForbiddenException("You can only post one idea every 48 hours");
//             }
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

//         if (request.isClassProposal()) {
//             idea.setClassProposal(true);
//             idea.setProposalClass(student.getYear() + " Year " + student.getBranch());
//         }

//         Idea saved = ideaRepository.save(idea);

//         // ✅ notify all admins immediately when class proposal posted
//         if (request.isClassProposal()) {
//             try {
//                 List<StudentProfile> admins = studentProfileRepository.findAll()
//                         .stream()
//                         .filter(s -> s.getRole() == Role.ADMIN)
//                         .toList();

//                 for (StudentProfile admin : admins) {
//                     notificationService.create(
//                             admin.getRollNumber(),
//                             "🏛️ Class Proposal from " + idea.getProposalClass() +
//                             ": \"" + idea.getTitle() + "\" — posted by " + student.getName(),
//                             "CLASS_PROPOSAL"
//                     );
//                 }
//             } catch (Exception e) {
//                 System.err.println("Class proposal notification failed: " + e.getMessage());
//             }
//         }

//         return mapToResponse(saved);
//     }

//     // ✅ edit idea — only owner, only within 1 hour of posting
//     public IdeaResponse editIdea(String ideaId, String newTitle, String newDescription, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         // ✅ only owner can edit
//         if (!rollNumber.equals(idea.getCreatedByRollNumber())) {
//             throw new ForbiddenException("You can only edit your own ideas");
//         }

//         // ✅ only within 1 hour of posting
//         long minutesSincePost = java.time.Duration.between(idea.getCreatedAt(), LocalDateTime.now()).toMinutes();
//         if (minutesSincePost > 60) {
//             throw new ForbiddenException("Ideas can only be edited within 1 hour of posting");
//         }

//         // ✅ check title uniqueness if title changed
//         if (!newTitle.equals(idea.getTitle()) && ideaRepository.existsByTitle(newTitle)) {
//             throw new ForbiddenException("An idea with this title already exists");
//         }

//         idea.setTitle(newTitle);
//         idea.setDescription(newDescription);

//         return mapToResponse(ideaRepository.save(idea));
//     }

//     public IdeaResponse likeIdea(String ideaId, String rollNumber) {
//         Idea idea = ideaRepository.findById(ideaId)
//                 .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

//         if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

//         if (idea.getLikedBy().contains(rollNumber)) {
//             idea.getLikedBy().remove(rollNumber);
//             idea.setLikes(idea.getLikes() - 1);
//         } else {
//             idea.getLikedBy().add(rollNumber);
//             idea.setLikes(idea.getLikes() + 1);

//             int newCount = idea.getLikes();
//             if (newCount == 5 || newCount == 10 || newCount == 25 || newCount == 50) {
//                 notificationService.create(
//                     idea.getCreatedByRollNumber(),
//                     "🎉 Your idea \"" + idea.getTitle() + "\" reached " + newCount + " likes!",
//                     "LIKE_MILESTONE"
//                 );
//             }
//         }

//         IdeaResponse response = mapToResponse(ideaRepository.save(idea));

//         try {
//             int likes = idea.getLikes();
//             if (idea.getCreatedByRollNumber() != null &&
//                     !idea.getCreatedByRollNumber().equals(rollNumber)) {
//                 if (likes == 5 || likes == 10 || likes == 25 || likes == 50) {
//                     notificationService.create(
//                             idea.getCreatedByRollNumber(),
//                             "🎉 Your idea \"" + idea.getTitle() + "\" reached " + likes + " likes!",
//                             "IDEA_LIKE"
//                     );
//                 }
//             }
//             if (likes == 15) {
//                 List<StudentProfile> moderatorsAndAdmins = studentProfileRepository.findAll()
//                         .stream()
//                         .filter(s -> s.getRole() == Role.MODERATOR || s.getRole() == Role.ADMIN)
//                         .toList();
//                 for (StudentProfile mod : moderatorsAndAdmins) {
//                     notificationService.create(
//                             mod.getRollNumber(),
//                             "💡 Idea \"" + idea.getTitle() + "\" has reached 15 likes — consider reviewing it!",
//                             "IDEA_REVIEW"
//                     );
//                 }
//             }
//         } catch (Exception e) {
//             System.err.println("Notification failed: " + e.getMessage());
//         }

//         return response;
//     }

//     public IdeaResponse updateStatus(String ideaId, String status, String moderatorNote,
//                                      String rollNumber, String showcaseImageUrl) {
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

//         if ("IMPLEMENTED".equals(status) && showcaseImageUrl != null && !showcaseImageUrl.isBlank()) {
//             idea.setShowcaseImageUrl(showcaseImageUrl);
//         }

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
//                     notificationService.create(idea.getCreatedByRollNumber(), message, "IDEA_STATUS");
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
//         response.setCreatedById(idea.getCreatedById());
//         response.setCreatedByEmail(idea.getCreatedByEmail());
//         response.setLikes(idea.getLikes());
//         response.setLikedBy(idea.getLikedBy());
//         response.setComments(idea.getComments() != null ? idea.getComments() : new ArrayList<>());
//         response.setStatus(idea.getStatus() != null ? idea.getStatus() : "OPEN");
//         response.setModeratorNote(idea.getModeratorNote());
//         response.setReviewedBy(idea.getReviewedBy());
//         response.setReviewedAt(idea.getReviewedAt());
//         response.setShowcaseImageUrl(idea.getShowcaseImageUrl());
//         response.setClassProposal(idea.isClassProposal());
//         response.setProposalClass(idea.getProposalClass());
//         return response;
//     }

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

//     public List<IdeaResponse> getAllIdeas() {
//         return ideaRepository.findAll().stream()
//             .filter(i -> !i.isArchived())
//             .map(this::mapToResponse)
//             .collect(Collectors.toList());
//     }

//     public List<IdeaResponse> getArchivedIdeas() {
//         return ideaRepository.findAll().stream()
//             .filter(Idea::isArchived)
//             .map(this::mapToResponse)
//             .collect(Collectors.toList());
//     }

//     public List<Idea> getLeaderboard() {
//         return ideaRepository.findAll().stream()
//             .filter(idea -> {
//                 if (!idea.isArchived()) return true;
//                 return "IMPLEMENTED".equals(idea.getStatus()) && idea.getLikes() > 5;
//             })
//             .sorted((a, b) -> {
//                 boolean aImpl = "IMPLEMENTED".equals(a.getStatus());
//                 boolean bImpl = "IMPLEMENTED".equals(b.getStatus());
//                 if (aImpl && !bImpl) return -1;
//                 if (!aImpl && bImpl) return 1;
//                 boolean aRej = "REJECTED".equals(a.getStatus());
//                 boolean bRej = "REJECTED".equals(b.getStatus());
//                 if (aRej && !bRej) return 1;
//                 if (!aRej && bRej) return -1;
//                 int likesDiff = b.getLikes() - a.getLikes();
//                 if (likesDiff != 0) return likesDiff;
//                 int commentsDiff = (b.getComments() != null ? b.getComments().size() : 0)
//                                  - (a.getComments() != null ? a.getComments().size() : 0);
//                 if (commentsDiff != 0) return commentsDiff;
//                 return b.getCreatedAt().compareTo(a.getCreatedAt());
//             })
//             .limit(10)
//             .collect(Collectors.toList());
//     }

//     public List<Idea> getShowcase() {
//         return ideaRepository.findAll().stream()
//             .filter(idea -> "IMPLEMENTED".equals(idea.getStatus()))
//             .sorted((a, b) -> {
//                 boolean aHasImg = a.getShowcaseImageUrl() != null && !a.getShowcaseImageUrl().isBlank();
//                 boolean bHasImg = b.getShowcaseImageUrl() != null && !b.getShowcaseImageUrl().isBlank();
//                 if (aHasImg && !bHasImg) return -1;
//                 if (!aHasImg && bHasImg) return 1;
//                 return b.getLikes() - a.getLikes();
//             })
//             .limit(6)
//             .collect(Collectors.toList());
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
import com.example.PdfBackend.Service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if (request.isClassProposal() &&
                student.getRole() != Role.MODERATOR && student.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Only moderators can post class proposals");
        }

        LocalDateTime cutoff = LocalDateTime.now().minusHours(48);
        LocalDateTime now = LocalDateTime.now();

        if (!request.isClassProposal()) {
            boolean alreadyPostedRecently = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
                    student.getId(), cutoff, now
            );
            if (alreadyPostedRecently) {
                throw new ForbiddenException("You can only post one idea every 48 hours");
            }
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

        if (request.isClassProposal()) {
            idea.setClassProposal(true);
            idea.setProposalClass(student.getYear() + " " + student.getBranch());

        }

        Idea saved = ideaRepository.save(idea);

        // ✅ notify all admins immediately when class proposal posted
        if (request.isClassProposal()) {
            try {
                List<StudentProfile> admins = studentProfileRepository.findAll()
                        .stream()
                        .filter(s -> s.getRole() == Role.ADMIN)
                        .toList();

                for (StudentProfile admin : admins) {
                    notificationService.create(
                            admin.getRollNumber(),
                            "🏛️ Class Proposal from " + idea.getProposalClass() +
                                    ": \"" + idea.getTitle() + "\" — posted by " + student.getName(),
                            "CLASS_PROPOSAL"
                    );
                }
            } catch (Exception e) {
                System.err.println("Class proposal notification failed: " + e.getMessage());
            }
        }

        return mapToResponse(saved);
    }

    // ✅ edit idea — only owner, only within 1 hour of posting
    public IdeaResponse editIdea(String ideaId, String newTitle, String newDescription, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        // ✅ only owner can edit
        if (!rollNumber.equals(idea.getCreatedByRollNumber())) {
            throw new ForbiddenException("You can only edit your own ideas");
        }

        // ✅ only within 1 hour of posting
        long minutesSincePost = java.time.Duration.between(idea.getCreatedAt(), LocalDateTime.now()).toMinutes();
        if (minutesSincePost > 60) {
            throw new ForbiddenException("Ideas can only be edited within 1 hour of posting");
        }

        // ✅ check title uniqueness if title changed
        if (!newTitle.equals(idea.getTitle()) && ideaRepository.existsByTitle(newTitle)) {
            throw new ForbiddenException("An idea with this title already exists");
        }

        idea.setTitle(newTitle);
        idea.setDescription(newDescription);

        return mapToResponse(ideaRepository.save(idea));
    }

    public IdeaResponse likeIdea(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

        if (idea.getLikedBy().contains(rollNumber)) {
            idea.getLikedBy().remove(rollNumber);
            idea.setLikes(idea.getLikes() - 1);
        } else {
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

    // ✅ UPDATED: Added showcaseLink parameter & support
    public IdeaResponse updateStatus(String ideaId, String status, String moderatorNote,
                                    String rollNumber, String showcaseImageUrl, String showcaseLink) {
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

        if ("IMPLEMENTED".equals(status)) {
            if (showcaseImageUrl != null && !showcaseImageUrl.isBlank()) {
                idea.setShowcaseImageUrl(showcaseImageUrl);
            }
            // ✅ save showcase link
            if (showcaseLink != null && !showcaseLink.isBlank()) {
                idea.setShowcaseLink(showcaseLink);
            }
        }

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
                    notificationService.create(idea.getCreatedByRollNumber(), message, "IDEA_STATUS");
                }
            }
        } catch (Exception e) {
            System.err.println("Status notification failed: " + e.getMessage());
        }

        return mapToResponse(idea);
    }

    // ✅ UPDATED: Added showcaseLink to response
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
        response.setShowcaseImageUrl(idea.getShowcaseImageUrl());
        response.setShowcaseLink(idea.getShowcaseLink()); // ✅ NEW
        response.setClassProposal(idea.isClassProposal());
        response.setProposalClass(idea.getProposalClass());
        return response;
    }

    public void deleteIdea(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));
        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));
        boolean isAdmin = student.getRole() == Role.ADMIN;
        boolean isOwner = rollNumber.equals(idea.getCreatedByRollNumber());
        boolean isImplementingModerator = student.getRole() == Role.MODERATOR
        && "IMPLEMENTED".equals(idea.getStatus())
        && student.getName().equals(idea.getReviewedBy());
        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("You can only delete your own ideas");
        }
        ideaRepository.deleteById(ideaId);
    }

    public List<IdeaResponse> getAllIdeas() {
        return ideaRepository.findAll().stream()
                .filter(i -> !i.isArchived())
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<IdeaResponse> getArchivedIdeas() {
        return ideaRepository.findAll().stream()
                .filter(Idea::isArchived)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<Idea> getLeaderboard() {
        return ideaRepository.findAll().stream()
                .filter(idea -> {
                    if (!idea.isArchived()) return true;
                    return "IMPLEMENTED".equals(idea.getStatus()) && idea.getLikes() > 5;
                })
                .sorted((a, b) -> {
                    boolean aImpl = "IMPLEMENTED".equals(a.getStatus());
                    boolean bImpl = "IMPLEMENTED".equals(b.getStatus());
                    if (aImpl && !bImpl) return -1;
                    if (!aImpl && bImpl) return 1;
                    boolean aRej = "REJECTED".equals(a.getStatus());
                    boolean bRej = "REJECTED".equals(b.getStatus());
                    if (aRej && !bRej) return 1;
                    if (!aRej && bRej) return -1;
                    int likesDiff = b.getLikes() - a.getLikes();
                    if (likesDiff != 0) return likesDiff;
                    int commentsDiff = (b.getComments() != null ? b.getComments().size() : 0)
                            - (a.getComments() != null ? a.getComments().size() : 0);
                    if (commentsDiff != 0) return commentsDiff;
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                })
                .limit(10)
                .collect(Collectors.toList());
    }

    public List<Idea> getShowcase() {
        return ideaRepository.findAll().stream()
                .filter(idea -> "IMPLEMENTED".equals(idea.getStatus()))
                .sorted((a, b) -> {
                    boolean aHasImg = a.getShowcaseImageUrl() != null && !a.getShowcaseImageUrl().isBlank();
                    boolean bHasImg = b.getShowcaseImageUrl() != null && !b.getShowcaseImageUrl().isBlank();
                    if (aHasImg && !bHasImg) return -1;
                    if (!aHasImg && bHasImg) return 1;
                    return b.getLikes() - a.getLikes();
                })
                .limit(6)
                .collect(Collectors.toList());
    }
}
