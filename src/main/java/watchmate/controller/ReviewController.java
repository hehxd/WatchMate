package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.ReviewRequest;
import watchmate.dto.ReviewResponse;
import watchmate.service.ReviewService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable UUID userId,
            @RequestBody ReviewRequest request
    ) {
        ReviewResponse response = reviewService.createReview(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/title/{titleId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByTitle(@PathVariable Long titleId) {
        List<ReviewResponse> response = reviewService.getReviewsByTitle(titleId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByUser(@PathVariable UUID userId) {
        List<ReviewResponse> response = reviewService.getReviewsByUser(userId);
        return ResponseEntity.ok(response);
    }
}