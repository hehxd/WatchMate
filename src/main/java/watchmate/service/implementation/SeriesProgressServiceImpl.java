package watchmate.service.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import watchmate.dto.SeriesProgressRequest;
import watchmate.dto.SeriesProgressResponse;
import watchmate.model.SeriesProgress;
import watchmate.model.SeriesStatus;
import watchmate.model.Title;
import watchmate.model.TitleType;
import watchmate.model.User;
import watchmate.repository.SeriesProgressRepository;
import watchmate.repository.TitleRepository;
import watchmate.repository.UserRepository;
import watchmate.service.SeriesProgressService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SeriesProgressServiceImpl implements SeriesProgressService {

    private final SeriesProgressRepository seriesProgressRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;

    @Override
    public SeriesProgressResponse saveProgress(UUID userId, SeriesProgressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Title title = titleRepository.findById(request.getTitleId())
                .orElseThrow(() -> new RuntimeException("Title not found"));

        if (title.getType() != TitleType.SERIES) {
            throw new RuntimeException("Progress can only be tracked for series");
        }

        SeriesProgress progress = seriesProgressRepository.findByUserIdAndTitleId(userId, request.getTitleId())
                .orElse(new SeriesProgress());

        progress.setUser(user);
        progress.setTitle(title);
        progress.setLastSeason(request.getLastSeason());
        progress.setLastEpisode(request.getLastEpisode());
        progress.setStatus(SeriesStatus.valueOf(request.getStatus().toUpperCase()));

        SeriesProgress saved = seriesProgressRepository.save(progress);

        return new SeriesProgressResponse(
                saved.getId(),
                saved.getTitle().getId(),
                saved.getTitle().getTitle(),
                saved.getLastSeason(),
                saved.getLastEpisode(),
                saved.getStatus().name()
        );
    }

    @Override
    public List<SeriesProgressResponse> getUserProgress(UUID userId) {
        return seriesProgressRepository.findByUserId(userId)
                .stream()
                .map(progress -> new SeriesProgressResponse(
                        progress.getId(),
                        progress.getTitle().getId(),
                        progress.getTitle().getTitle(),
                        progress.getLastSeason(),
                        progress.getLastEpisode(),
                        progress.getStatus().name()
                ))
                .toList();
    }
}
