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

package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
import com.example.PdfBackend.DTO.IdeaDto.IdeaResponse;
import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.IdeaRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final StudentProfileRepository studentProfileRepository;

    public IdeaService(IdeaRepository ideaRepository, StudentProfileRepository studentProfileRepository) {
        this.ideaRepository = ideaRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public List<Idea> getAllIdea() {
        return ideaRepository.findAll();
    }

    public IdeaResponse createIdea(IdeaRequest request, String rollNumber) {
        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

        // ✅ one idea per day check
        // LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
        // LocalDateTime endOfDay = startOfDay.plusDays(1);

        // boolean alreadyPostedToday = ideaRepository.existsByCreatedByIdAndCreatedAtBetween(
        //         student.getId(), startOfDay, endOfDay
        // );

        // if (alreadyPostedToday) {
        //     throw new ForbiddenException("You can only post one idea per day");
        // }
        // ✅ 48 hour cooldown — stored in DB, cannot be bypassed
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
        idea.setCreatedById(student.getId());       // ✅ added
        idea.setCreatedByEmail(student.getEmail()); // ✅ added

        return mapToResponse(ideaRepository.save(idea));
    }

    public IdeaResponse likeIdea(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

        if (idea.getLikedBy().contains(rollNumber)) {
            throw new ForbiddenException("You have already liked this idea");
        }

        idea.getLikedBy().add(rollNumber);
        idea.setLikes(idea.getLikes() + 1);

        return mapToResponse(ideaRepository.save(idea));
    }

    public IdeaResponse mapToResponse(Idea idea) {
        return new IdeaResponse(
                idea.getId(),
                idea.getTitle(),
                idea.getCategory(),
                idea.getDescription(),
                idea.getCreatedAt(),
                idea.getCreatedByName(),
                idea.getCreatedByBranch(),
                idea.getCreatedByYear(),
                idea.getLikes(),
                idea.getLikedBy(),
                idea.getComments() != null ? idea.getComments() : new ArrayList<>()
        );
    }
}