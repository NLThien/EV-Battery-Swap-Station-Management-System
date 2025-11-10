package com.example.booking_service.service.Impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.booking_service.model.dto.StationDTO;
import com.example.booking_service.model.entity.BatteryPackage;
import com.example.booking_service.model.entity.Booking;
import com.example.booking_service.repository.BatteryPackageRepository;
import com.example.booking_service.repository.BookingRepository;
import com.example.booking_service.service.client.StationServiceClient;

@Service
@Transactional
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private StationServiceClient stationServiceClient;
    
    @Autowired
    private BatteryPackageRepository batteryPackageRepository;

    // Lấy tất cả bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Lấy booking theo ID
    public Booking getBookingById(String id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    // Tạo gói thuê pin
    public Booking createBooking(Booking booking) {
        // Validate station từ station service
        StationDTO station = stationServiceClient.getStationById(booking.getStationId());
        
        if (station == null) {
            throw new RuntimeException("Station not found");
        }
        
        if (!"ACTIVE".equals(station.getStatus())) {
            throw new RuntimeException("Station is not active");
        }
        
        if (station.getAvailableSlots() <= 0) {
            throw new RuntimeException("No available slots at this station");
        }
        
        // Generate UUID cho booking
        booking.setId("BOOK_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());
        
        return bookingRepository.save(booking);
    }

    // Thêm method getBookingsByDate
    public List<Booking> getBookingsByDate(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);
        return bookingRepository.findByBookingTimeBetween(start, end);
    }

    // Tạo booking với gói pin
    public Booking createBookingWithPackage(Booking booking, String packageId) {
        StationDTO station = stationServiceClient.getStationById(booking.getStationId());   // Lấy station từ service
        
        if (station == null) {                          // Kiểm tra tồn tại station
            throw new RuntimeException("Station not found");
        }
        
        if (!"ACTIVE".equals(station.getStatus())) {    // Kiểm tra trạng thái station
            throw new RuntimeException("Station is not active");
        }
        
        if (station.getAvailableSlots() <= 0) {         // Kiểm tra slot trống
            throw new RuntimeException("No available slots at this station");
        }

        // Validate battery package
        BatteryPackage batteryPackage = batteryPackageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Battery package not found"));
        
        booking.setBatteryPackage(batteryPackage);
        booking.setId("BOOK_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());
        
        return bookingRepository.save(booking);
    }

    // Lấy booking theo số điện thoại khách hàng
    public List<Booking> getBookingsByCustomer(String customerPhone) {
        return bookingRepository.findByCustomerPhone(customerPhone);
    }
    
    // Hủy booking
    public Booking cancelBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        if (!"PENDING".equals(booking.getStatus()) && !"CONFIRMED".equals(booking.getStatus())) {
            throw new RuntimeException("Cannot cancel booking with status: " + booking.getStatus());
        }
        
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
    
    // Hoàn thành booking
    public Booking completeBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("COMPLETED");
        return bookingRepository.save(booking);
    }
    
    // Xác nhận booking
    public Booking confirmBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }
}