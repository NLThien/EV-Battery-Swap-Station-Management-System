package com.example.feedbackservice.service;

import com.example.feedbackservice.entity.Feedback;
import java.util.List;

public interface FeedbackService {
    List<Feedback> getAllFeedbacks();
    Feedback getFeedbackById(Long id);
    Feedback createFeedback(Feedback feedback);
    Feedback updateAdminReply(Long id, String admin_reply);
    void deleteFeedback(Long id);
}
