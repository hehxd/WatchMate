package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.RatingRequest;
import watchmate.dto.RatingResponse;
import watchmate.service.RatingService;
import watchmate.security.CurrentUserProvider;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    public ResponseEntity<RatingResponse> saveRating(@RequestBody RatingRequest request) {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(ratingService.saveRating(userId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<RatingResponse>> getMyRatings() {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(ratingService.getRatingsByUser(userId));
    }

    @GetMapping("/title/{titleId}")
    public ResponseEntity<List<RatingResponse>> getRatingsByTitle(@PathVariable Long titleId) {
        return ResponseEntity.ok(ratingService.getRatingsByTitle(titleId));
    }

    @DeleteMapping("/title/{titleId}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long titleId) {
        UUID userId = currentUserProvider.getCurrentUserId();
        ratingService.deleteRating(userId, titleId);
        return ResponseEntity.noContent().build();
    }
}