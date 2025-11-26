package com.example.feedbackservice.service.impl;

import com.example.feedbackservice.client.UserClient;
import com.example.feedbackservice.dto.UserResponse;
import com.example.feedbackservice.entity.Feedback;
import com.example.feedbackservice.repository.FeedbackRepository;
import com.example.feedbackservice.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserClient userClient;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository, UserClient userClient) {
        this.feedbackRepository = feedbackRepository;
        this.userClient = userClient;
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy feedback với id: " + id));
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        // Gọi UserService lấy thông tin user
        UserResponse user = userClient.getUserById(feedback.getUserId());
        if (user == null) {
            throw new RuntimeException("User not found: " + feedback.getUserId());
        }

        // Gán thông tin user vào feedback
        feedback.setUserName(user.getUserName());
        feedback.setDate(LocalDate.now());

        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback updateAdminReply(Long id, String reply) {
        Feedback fb = getFeedbackById(id);
        fb.setAdminReply(reply);
        return feedbackRepository.save(fb);
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
