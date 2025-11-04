package com.example.station_management.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.station_management.model.dto.DashboardResponse;
import com.example.station_management.model.entity.Station;
import com.example.station_management.model.enums.StationStatus;
import com.example.station_management.repository.StationRepository;
import com.example.station_management.service.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final StationRepository stationRepository;

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
        
        // TODO: Gọi battery service để lấy thông tin pin
        // Tạm thời set giá trị mặc định
        Map<String, Integer> batteryStatusDist = new HashMap<>();
        batteryStatusDist.put("AVAILABLE", 0);
        batteryStatusDist.put("IN_USE", 0);
        batteryStatusDist.put("CHARGING", 0);
        batteryStatusDist.put("MAINTENANCE", 0);
        
        // Tạo và trả về response
        DashboardResponse response = new DashboardResponse();
        response.setTotalStations(totalStations);
        response.setActiveStations(activeStations);
        response.setMaintenanceStations(maintenanceStations);
        response.setStationStatusDistribution(stationStatusDist);
        response.setTotalBatteries(0);
        response.setAvailableBatteries(0);
        response.setInUseBatteries(0);
        response.setChargingBatteries(0);
        response.setTodaySwaps(0);
        response.setRevenueToday(0.0);
        response.setBatteryStatusDistribution(batteryStatusDist);
        
        return response;
    }
}