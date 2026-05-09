package watchmate.service;

import watchmate.dto.ReviewRequest;
import watchmate.dto.ReviewResponse;

import java.util.List;
import java.util.UUID;

public interface ReviewService {
    ReviewResponse createReview(UUID userId, ReviewRequest request);
    List<ReviewResponse> getReviewsByTitle(Long titleId);
    List<ReviewResponse> getReviewsByUser(UUID userId);
}