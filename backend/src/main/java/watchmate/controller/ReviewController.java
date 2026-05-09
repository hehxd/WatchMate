package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.ReviewRequest;
import watchmate.dto.ReviewResponse;
import watchmate.service.ReviewService;
import watchmate.security.CurrentUserProvider;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(userId, request));
    }

    @GetMapping("/title/{titleId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByTitle(@PathVariable Long titleId) {
        return ResponseEntity.ok(reviewService.getReviewsByTitle(titleId));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ReviewResponse>> getMyReviews() {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(reviewService.getReviewsByUser(userId));
    }
}