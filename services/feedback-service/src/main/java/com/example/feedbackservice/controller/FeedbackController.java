package com.example.feedbackservice.controller;

import com.example.feedbackservice.dto.AdminReplyRequest;
import com.example.feedbackservice.dto.FeedbackRequest;
import com.example.feedbackservice.entity.Feedback;
import com.example.feedbackservice.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public List<Feedback> getAll() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/{id}")
    public Feedback getById(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id);
    }

    @PostMapping
    public Feedback create(@RequestBody FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setUserId(request.getUserId());
        feedback.setFacility(request.getFacility());
        feedback.setSpeed(request.getSpeed());
        feedback.setBattery(request.getBattery());
        feedback.setPrice(request.getPrice());
        feedback.setStaff(request.getStaff());
        feedback.setSatisfaction(request.getSatisfaction());
        feedback.setComment(request.getComment());
        return feedbackService.createFeedback(feedback);
    }

    @PutMapping("/{id}/reply")
    public Feedback reply(@PathVariable Long id, @RequestBody AdminReplyRequest req) {
        return feedbackService.updateAdminReply(id, req.getReply());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
    }
}
