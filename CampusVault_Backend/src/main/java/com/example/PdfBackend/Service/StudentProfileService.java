package com.example.PdfBackend.Service;

import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.model.StudentProfileResponse;
import com.example.PdfBackend.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    @Autowired
    private StudentProfileRepository studentProfileRepository;




    public StudentProfileResponse saveProfile (StudentProfile studentProfile) throws IllegalArgumentException {
        String roll = studentProfile.getRollNumber();
        if(roll.length() < 4 || roll.charAt(2) != 'C' || roll.charAt(3) != '7')  {
    throw new IllegalArgumentException("Invalid roll number format");

        }
        if (studentProfileRepository.existsByRollNumber (studentProfile.getRollNumber())) {
            throw new IllegalArgumentException("Roll number already exists");
        }

        StudentProfile saved = studentProfileRepository.save(studentProfile);
        long count = studentProfileRepository.count();

        return new StudentProfileResponse(saved, count);
    }

    public StudentProfile getByRollNumber (String rollNumber) {
        return studentProfileRepository.findByRollNumber(rollNumber).orElseThrow(() ->
                new IllegalArgumentException("Student Not found"));
    }

    public boolean rollNumberExists(String rollNumber) {

        if (rollNumber == null || rollNumber.length() < 4) {
            return false;
        }

        String roll = rollNumber.trim().toUpperCase();

        // optional but smart: enforce format again
        if (roll.charAt(2) != 'C' || roll.charAt(3) != '7') {
            return false;
        }

        return studentProfileRepository.existsByRollNumber(roll);
    }

    public long getStudentCount() {
        return studentProfileRepository.count();
    }

}
