package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.SeriesProgressRequest;
import watchmate.dto.SeriesProgressResponse;
import watchmate.service.SeriesProgressService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/series-progress")
@RequiredArgsConstructor
public class SeriesProgressController {

    private final SeriesProgressService seriesProgressService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<SeriesProgressResponse> saveProgress(
            @PathVariable UUID userId,
            @RequestBody SeriesProgressRequest request
    ) {
        SeriesProgressResponse response = seriesProgressService.saveProgress(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SeriesProgressResponse>> getUserProgress(@PathVariable UUID userId) {
        List<SeriesProgressResponse> response = seriesProgressService.getUserProgress(userId);
        return ResponseEntity.ok(response);
    }
}
