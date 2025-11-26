package com.example.feedbackservice.dto;

public class FeedbackRequest {
    private String userId;
    private String user;
    private int facility;
    private int speed;
    private int battery;
    private int price;
    private int staff;
    private int satisfaction;
    private String comment;

    public FeedbackRequest() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public int getFacility() { return facility; }
    public void setFacility(int facility) { this.facility = facility; }

    public int getSpeed() { return speed; }
    public void setSpeed(int speed) { this.speed = speed; }

    public int getBattery() { return battery; }
    public void setBattery(int battery) { this.battery = battery; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getStaff() { return staff; }
    public void setStaff(int staff) { this.staff = staff; }

    public int getSatisfaction() { return satisfaction; }
    public void setSatisfaction(int satisfaction) { this.satisfaction = satisfaction; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
