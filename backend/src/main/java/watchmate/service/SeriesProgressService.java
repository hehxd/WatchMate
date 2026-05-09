package watchmate.service;

import watchmate.dto.SeriesProgressRequest;
import watchmate.dto.SeriesProgressResponse;

import java.util.List;
import java.util.UUID;

public interface SeriesProgressService {
    SeriesProgressResponse saveProgress(UUID userId, SeriesProgressRequest request);
    List<SeriesProgressResponse> getUserProgress(UUID userId);
}
