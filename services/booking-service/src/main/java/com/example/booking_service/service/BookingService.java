package com.example.booking_service.service;

import com.example.booking_service.model.entity.Booking;
import com.example.booking_service.model.entity.Station;
import com.example.booking_service.repository.BookingRepository;
import com.example.booking_service.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private StationRepository stationRepository;
    
    public Booking createBooking(Booking booking) {
        // Validate station availability
        Station station = stationRepository.findById(booking.getStation().getId())
                .orElseThrow(() -> new RuntimeException("Station not found"));
        
        if (station.getAvailableSlots() <= 0) {
            throw new RuntimeException("No available slots at this station");
        }
        
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());
        
        // Update available slots
        station.setAvailableSlots(station.getAvailableSlots() - 1);
        stationRepository.save(station);
        
        return bookingRepository.save(booking);
    }
    
    public Booking confirmBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getBookingsByDate(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);
        return bookingRepository.findByBookingTimeBetween(start, end);
    }
}