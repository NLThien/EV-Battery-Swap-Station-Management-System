package com.example.station_management.controller;

import com.example.station_management.model.dto.DashboardResponse;
import com.example.station_management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    @GetMapping("/overview")
    public ResponseEntity<DashboardResponse> getDashboardOverview() {
        return ResponseEntity.ok(dashboardService.getDashboardOverview());
    }
}