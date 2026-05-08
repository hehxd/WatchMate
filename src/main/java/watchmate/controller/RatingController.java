package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.RatingRequest;
import watchmate.dto.RatingResponse;
import watchmate.service.RatingService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<RatingResponse> saveRating(
            @PathVariable UUID userId,
            @RequestBody RatingRequest request
    ) {
        RatingResponse response = ratingService.saveRating(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RatingResponse>> getRatingsByUser(@PathVariable UUID userId) {
        List<RatingResponse> response = ratingService.getRatingsByUser(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/title/{titleId}")
    public ResponseEntity<List<RatingResponse>> getRatingsByTitle(@PathVariable Long titleId) {
        List<RatingResponse> response = ratingService.getRatingsByTitle(titleId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/user/{userId}/title/{titleId}")
    public ResponseEntity<Void> deleteRating(
            @PathVariable UUID userId,
            @PathVariable Long titleId
    ) {
        ratingService.deleteRating(userId, titleId);
        return ResponseEntity.noContent().build();
    }
}
