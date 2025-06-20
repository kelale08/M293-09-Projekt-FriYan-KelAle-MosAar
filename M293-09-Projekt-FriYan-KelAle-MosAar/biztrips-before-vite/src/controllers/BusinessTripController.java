package ch.clip.trips.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.clip.trips.ex.TriptNotFoundException;
import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.repo.BusinessTripRepository;

@RestController
@RequestMapping("/v1")
@CrossOrigin(origins = "*") // Globale CORS-Konfiguration
public class BusinessTripController {

    @Autowired
    private BusinessTripRepository tripRepository;

    // Alle Business Trips abrufen
    @GetMapping("/trips")
    public List<BusinessTrip> getAllTrips() {
        return tripRepository.findAll();
    }

    // Einzelnen Business Trip abrufen
    @GetMapping("/trips/{id}")
    public BusinessTrip getTrip(@PathVariable Long id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new TriptNotFoundException(id));
    }

    // Neuen Business Trip erstellen
    @PostMapping("/trips")
    public BusinessTrip createTrip(@RequestBody BusinessTrip newTrip) {
        return tripRepository.save(newTrip);
    }

    // Business Trip aktualisieren
    @PutMapping("/trips/{id}")
    public BusinessTrip updateTrip(@RequestBody BusinessTrip newTrip, @PathVariable Long id) {
        return tripRepository.findById(id).map(trip -> {
            trip.setTitle(newTrip.getTitle());
            trip.setDescription(newTrip.getDescription());
            trip.setStartTrip(newTrip.getStartTrip());
            trip.setEndTrip(newTrip.getEndTrip());
            return tripRepository.save(trip);
        }).orElseGet(() -> {
            newTrip.setId(id);
            return tripRepository.save(newTrip);
        });
    }

    // Business Trip löschen - KORRIGIERT!
    @DeleteMapping("/trips/{id}")
    public void deleteTrip(@PathVariable Long id) {
        tripRepository.deleteById(id);
    }
}
