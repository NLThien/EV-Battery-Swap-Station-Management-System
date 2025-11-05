package com.example.booking_service.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.booking_service.model.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    
    List<Booking> findByStationIdAndBookingTimeBetween(String stationId, 
                                                     LocalDateTime start, 
                                                     LocalDateTime end);
    
    List<Booking> findByCustomerPhoneAndStatus(String customerPhone, String status);
    
    List<Booking> findByBookingTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.station.id = :stationId AND b.status = 'CONFIRMED' AND b.bookingTime BETWEEN :startTime AND :endTime")
    Long countConfirmedBookingsForStation(@Param("stationId") String stationId, 
                                        @Param("startTime") LocalDateTime startTime, 
                                        @Param("endTime") LocalDateTime endTime);
}