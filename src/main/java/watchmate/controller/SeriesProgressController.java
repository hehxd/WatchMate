package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.SeriesProgressRequest;
import watchmate.dto.SeriesProgressResponse;
import watchmate.service.SeriesProgressService;
import watchmate.security.CurrentUserProvider;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/series-progress")
@RequiredArgsConstructor
public class SeriesProgressController {

    private final SeriesProgressService seriesProgressService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    public ResponseEntity<SeriesProgressResponse> saveProgress(
            @RequestBody SeriesProgressRequest request) {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(seriesProgressService.saveProgress(userId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<SeriesProgressResponse>> getMyProgress() {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(seriesProgressService.getUserProgress(userId));
    }
}