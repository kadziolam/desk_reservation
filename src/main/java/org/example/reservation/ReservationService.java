package org.example.reservation;

import org.example.desks.DeskRepository;
import org.example.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/create-reservation")
    public ResponseEntity addReservation(@RequestBody Reservation reservation) {
        List<Reservation> reservationFromDb = reservationRepository.findByDeskIdAndDate(reservation.getDeskId(), reservation.getDate());

        if (!reservationFromDb.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Reservation saveReservation = reservationRepository.save(reservation);
        return ResponseEntity.ok(saveReservation);
    }

    @DeleteMapping("/delete-reservation")
    public ResponseEntity deleteReservation(@RequestBody Reservation reservation) {
        List<Reservation> reservationFromDb = reservationRepository.findByDeskIdAndDate(reservation.getDeskId(), reservation.getDate());

        if (reservationFromDb.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        reservationRepository.deleteAll(reservationFromDb);
        return ResponseEntity.ok(reservationFromDb);
    }
}
