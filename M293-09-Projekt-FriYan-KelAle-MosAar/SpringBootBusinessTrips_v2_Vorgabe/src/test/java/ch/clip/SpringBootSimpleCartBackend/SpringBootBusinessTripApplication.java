package ch.clip.trips;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.model.Meeting;
import ch.clip.trips.repo.BusinessTripRepository;
import ch.clip.trips.repo.MeetingRepository;

@SpringBootApplication
public class SpringBootBusinessTripApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootBusinessTripApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadTestData(
            @Autowired BusinessTripRepository businessTripRepository,
            @Autowired MeetingRepository meetingRepository) {
        
        return (args) -> {
            // Business Trips erstellen
            BusinessTrip bt01 = new BusinessTrip(null, "San Francisco Tech Conference", 
                "World Trade Center - Server/IoT/Client Technologies", 
                LocalDateTime.of(2024, 3, 15, 9, 0),
                LocalDateTime.of(2024, 3, 18, 17, 0));
                
            BusinessTrip bt02 = new BusinessTrip(null, "Santa Clara Innovation Summit", 
                "Latest trends in Server/IoT/Client architecture", 
                LocalDateTime.of(2024, 6, 10, 8, 30),
                LocalDateTime.of(2024, 6, 14, 16, 0));
                
            BusinessTrip bt03 = new BusinessTrip(null, "San Jose Docker Conference", 
                "Container technologies and IoT integration", 
                LocalDateTime.of(2024, 9, 5, 9, 0),
                LocalDateTime.of(2024, 9, 8, 18, 0));

            // Business Trips speichern
            bt01 = businessTripRepository.save(bt01);
            bt02 = businessTripRepository.save(bt02);
            bt03 = businessTripRepository.save(bt03);

            // Meetings erstellen
            Meeting m1 = new Meeting(null, "Opening Keynote", "Introduction to new technologies", bt01);
            Meeting m2 = new Meeting(null, "IoT Workshop", "Hands-on IoT development", bt01);
            Meeting m3 = new Meeting(null, "Client Architecture", "Modern client-side patterns", bt01);
            
            Meeting m4 = new Meeting(null, "Innovation Showcase", "Latest tech innovations", bt02);
            Meeting m5 = new Meeting(null, "Networking Session", "Connect with industry leaders", bt02);
            
            Meeting m6 = new Meeting(null, "Docker Deep Dive", "Advanced container concepts", bt03);
            Meeting m7 = new Meeting(null, "IoT Integration", "Containerized IoT solutions", bt03);

            // Meetings speichern
            meetingRepository.save(m1);
            meetingRepository.save(m2);
            meetingRepository.save(m3);
            meetingRepository.save(m4);
            meetingRepository.save(m5);
            meetingRepository.save(m6);
            meetingRepository.save(m7);

            System.out.println("✅ Testdaten erfolgreich geladen!");
            System.out.println("📊 Business Trips: " + businessTripRepository.count());
            System.out.println("📅 Meetings: " + meetingRepository.count());
        };
    }
}
