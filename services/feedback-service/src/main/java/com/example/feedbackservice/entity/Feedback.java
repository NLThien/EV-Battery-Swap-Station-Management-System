package com.example.feedbackservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_id")
    private String userId;
    private LocalDate date;

    private int facility;
    private int speed;
    private int battery;
    private int price;
    private int staff;
    private int satisfaction;

    @Column(length = 1000)
    private String comment;

    @Column(length = 1000)
    private String adminReply;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

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

    public String getAdminReply() { return adminReply; }
    public void setAdminReply(String adminReply) { this.adminReply = adminReply; }
}
