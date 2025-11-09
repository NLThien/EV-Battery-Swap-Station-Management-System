package com.example.station_management.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.station_management.model.dto.DashboardResponse;
import com.example.station_management.model.entity.Station;
import com.example.station_management.model.enums.BatteryStationStatus;
import com.example.station_management.model.enums.StationStatus;
import com.example.station_management.repository.StationBatteryRepository;
import com.example.station_management.repository.StationRepository;
import com.example.station_management.service.DashboardService;
import com.example.station_management.service.client.BatteryServiceClient;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final StationRepository stationRepository;
    private final BatteryServiceClient batteryServiceClient;
    private final StationBatteryRepository stationBatteryRepository;
    private final Logger log = LoggerFactory.getLogger(DashboardServiceImpl.class);

    public DashboardServiceImpl(StationRepository stationRepository, BatteryServiceClient batteryServiceClient, StationBatteryRepository stationBatteryRepository) {
        this.stationRepository = stationRepository;
        this.batteryServiceClient = batteryServiceClient;
        this.stationBatteryRepository = stationBatteryRepository;
    }

    @Override
    public DashboardResponse getDashboardOverview() {
        // Lấy thông tin stations
        List<Station> allStations = stationRepository.findAll();
        
        // Tính toán thống kê stations
        int totalStations = allStations.size();
        int activeStations = (int) allStations.stream()
                .filter(station -> station.getStatus() == StationStatus.ACTIVE)
                .count();
        int maintenanceStations = (int) allStations.stream()
                .filter(station -> station.getStatus() == StationStatus.MAINTENANCE)
                .count();
        
        // Phân bố trạng thái stations
        Map<String, Integer> stationStatusDist = new HashMap<>();
        for (StationStatus status : StationStatus.values()) {
            long count = allStations.stream()
                    .filter(station -> station.getStatus() == status)
                    .count();
            stationStatusDist.put(status.name(), (int) count);
        }
        
        //Lấy thông tin pin từ StationBattery
        Map<String, Integer> batteryStatusDist = new HashMap<>();
        int totalBatteries = 0;
        int availableBatteries = 0;
        int inUseBatteries = 0;
        int chargingBatteries = 0;

        try {
            // Đếm tổng số pin cho mỗi trạng thái dùng cho Dashboard
            for (BatteryStationStatus status : BatteryStationStatus.values()) {
                Long count = stationBatteryRepository.countByStatus(status);
                int countValue = count != null ? count.intValue() : 0;
                
                batteryStatusDist.put(status.name(), countValue);
                totalBatteries += countValue;
                
                // Gán giá trị cho các field cụ thể
                switch (status) {
                    case AVAILABLE -> availableBatteries = countValue;
                    case IN_USE -> inUseBatteries = countValue;
                    case CHARGING -> chargingBatteries = countValue;
                    default -> { 
                        // Không làm gì vì hiển thị có 3 trạng thái chính
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Failed to get battery stats from StationBattery: {}", e.getMessage());
            // Fallback: dùng batteryServiceClient
            try {
                Map<String, Integer> batteryStats = batteryServiceClient.getGlobalBatteryStats(); // SỬ DỤNG
                availableBatteries = batteryStats.getOrDefault("availableBatteries", 0);
                inUseBatteries = batteryStats.getOrDefault("inUseBatteries", 0);
                chargingBatteries = batteryStats.getOrDefault("chargingBatteries", 0);
                totalBatteries = batteryStats.getOrDefault("totalBatteries", 0);
                
                // Cập nhật distribution map
                batteryStatusDist.put("AVAILABLE", availableBatteries);
                batteryStatusDist.put("IN_USE", inUseBatteries);
                batteryStatusDist.put("CHARGING", chargingBatteries);
                batteryStatusDist.put("MAINTENANCE", 0);
                
            } catch (Exception ex) {
                log.warn("Battery service fallback also failed: {}", ex.getMessage());
                // Set default values
                batteryStatusDist.put("AVAILABLE", 0);
                batteryStatusDist.put("IN_USE", 0);
                batteryStatusDist.put("CHARGING", 0);
                batteryStatusDist.put("MAINTENANCE", 0);
            }
        }
        
        // Tạo và trả về response
        DashboardResponse response = new DashboardResponse();
        response.setTotalStations(totalStations);
        response.setActiveStations(activeStations);
        response.setMaintenanceStations(maintenanceStations);
        response.setStationStatusDistribution(stationStatusDist);
        response.setTotalBatteries(totalBatteries);
        response.setAvailableBatteries(availableBatteries);
        response.setInUseBatteries(inUseBatteries);
        response.setChargingBatteries(chargingBatteries);
        response.setTodaySwaps(0);
        response.setRevenueToday(0.0);
        response.setBatteryStatusDistribution(batteryStatusDist);
        
        return response;
    }
}