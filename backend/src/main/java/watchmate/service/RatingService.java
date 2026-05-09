package watchmate.service;

import watchmate.dto.RatingRequest;
import watchmate.dto.RatingResponse;

import java.util.List;
import java.util.UUID;

public interface RatingService {
    RatingResponse saveRating(UUID userId, RatingRequest request);
    List<RatingResponse> getRatingsByUser(UUID userId);
    List<RatingResponse> getRatingsByTitle(Long titleId);
    void deleteRating(UUID userId, Long titleId);
}