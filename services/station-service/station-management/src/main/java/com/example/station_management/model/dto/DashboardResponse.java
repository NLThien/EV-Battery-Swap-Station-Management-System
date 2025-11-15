package com.example.station_management.model.dto;

import java.util.Map;
import java.util.Objects;

public class DashboardResponse {
    private Integer totalStations;
    private Integer activeStations;
    private Integer maintenanceStations;
    private Integer totalBatteries;
    private Integer availableBatteries;
    private Integer inUseBatteries;
    private Integer todaySwaps;
    private Map<String, Integer> stationStatusDistribution; // Phân bố trạm theo khu vực
    private Map<String, Integer> batteryStatusDistribution; // Phân bố trạng thái pin
    private Double revenueToday;
    private Integer chargingBatteries;

    // Constructor mặc định
    public DashboardResponse() {
    }

    // Constructor với tham số
    public DashboardResponse(
        Integer totalStations,
        Integer activeStations,              
        Integer maintenanceStations, 
        Integer totalBatteries,
        Integer availableBatteries, 
        Integer inUseBatteries,         
        Integer chargingBatteries, 
        Integer todaySwaps,           
        Double revenueToday
    ) {
        this.totalStations = totalStations;
        this.activeStations = activeStations;
        this.maintenanceStations = maintenanceStations;
        this.totalBatteries = totalBatteries;
        this.availableBatteries = availableBatteries;
        this.inUseBatteries = inUseBatteries;
        this.chargingBatteries = chargingBatteries;
        this.todaySwaps = todaySwaps;
        this.revenueToday = revenueToday;
    }

    // Getter và Setter
    public Integer getTotalStations() {
        return totalStations;
    }

    public void setTotalStations(Integer totalStations) {
        this.totalStations = totalStations;
    }

    public Integer getActiveStations() {
        return activeStations;
    }

    public void setActiveStations(Integer activeStations) {
        this.activeStations = activeStations;
    }

    public Integer getMaintenanceStations() {
        return maintenanceStations;
    }

    public void setMaintenanceStations(Integer maintenanceStations) {
        this.maintenanceStations = maintenanceStations;
    }

    public Integer getTotalBatteries() {
        return totalBatteries;
    }

    public void setTotalBatteries(Integer totalBatteries) {
        this.totalBatteries = totalBatteries;
    }

    public Integer getAvailableBatteries() {
        return availableBatteries;
    }

    public void setAvailableBatteries(Integer availableBatteries) {
        this.availableBatteries = availableBatteries;
    }

    public Integer getInUseBatteries() {
        return inUseBatteries;
    }

    public void setInUseBatteries(Integer inUseBatteries) {
        this.inUseBatteries = inUseBatteries;
    }

    public Integer getTodaySwaps() {
        return todaySwaps;
    }

    public void setTodaySwaps(Integer todaySwaps) {
        this.todaySwaps = todaySwaps;
    }

    public Map<String, Integer> getStationStatusDistribution() {
        return stationStatusDistribution;
    }

    public void setStationStatusDistribution(Map<String, Integer> stationStatusDistribution) {
        this.stationStatusDistribution = stationStatusDistribution;
    }

    public Map<String, Integer> getBatteryStatusDistribution() {
        return batteryStatusDistribution;
    }

    public void setBatteryStatusDistribution(Map<String, Integer> batteryStatusDistribution) {
        this.batteryStatusDistribution = batteryStatusDistribution;
    }

    public Double getRevenueToday() {
        return revenueToday;
    }

    public void setRevenueToday(Double revenueToday) {
        this.revenueToday = revenueToday;
    }

    public Integer getChargingBatteries() {
        return chargingBatteries;
    }

    public void setChargingBatteries(Integer chargingBatteries) {
        this.chargingBatteries = chargingBatteries;
    }

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DashboardResponse that = (DashboardResponse) o;
        return Objects.equals(totalStations, that.totalStations) &&
               Objects.equals(activeStations, that.activeStations) &&
               Objects.equals(maintenanceStations, that.maintenanceStations) &&
               Objects.equals(totalBatteries, that.totalBatteries) &&
               Objects.equals(availableBatteries, that.availableBatteries) &&
               Objects.equals(inUseBatteries, that.inUseBatteries) &&
               Objects.equals(todaySwaps, that.todaySwaps) &&
               Objects.equals(stationStatusDistribution, that.stationStatusDistribution) &&
               Objects.equals(batteryStatusDistribution, that.batteryStatusDistribution) &&
               Objects.equals(revenueToday, that.revenueToday) &&
               Objects.equals(chargingBatteries, that.chargingBatteries);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(totalStations, activeStations, maintenanceStations, totalBatteries, 
                           availableBatteries, inUseBatteries, todaySwaps, stationStatusDistribution, 
                           batteryStatusDistribution, revenueToday, chargingBatteries);
    }

    // toString() method
    @Override
    public String toString() {
        return "DashboardResponse{" +
                "totalStations=" + totalStations +
                ", activeStations=" + activeStations +
                ", maintenanceStations=" + maintenanceStations +
                ", totalBatteries=" + totalBatteries +
                ", availableBatteries=" + availableBatteries +
                ", inUseBatteries=" + inUseBatteries +
                ", todaySwaps=" + todaySwaps +
                ", stationStatusDistribution=" + stationStatusDistribution +
                ", batteryStatusDistribution=" + batteryStatusDistribution +
                ", revenueToday=" + revenueToday +
                ", chargingBatteries=" + chargingBatteries +
                '}';
    }
}