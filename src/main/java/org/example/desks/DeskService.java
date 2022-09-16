package org.example.desks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DeskService {

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    ObjectMapper objectMapper;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/desks")
    public ResponseEntity getDesks() throws JsonProcessingException {
        List<Desk> desks = deskRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(desks));
    }
}
