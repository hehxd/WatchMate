package watchmate.service.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import watchmate.dto.RatingRequest;
import watchmate.dto.RatingResponse;
import watchmate.model.Rating;
import watchmate.model.Title;
import watchmate.model.User;
import watchmate.repository.RatingRepository;
import watchmate.repository.TitleRepository;
import watchmate.repository.UserRepository;
import watchmate.service.RatingService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;

    @Override
    public RatingResponse saveRating(UUID userId, RatingRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Title title = titleRepository.findById(request.getTitleId())
                .orElseThrow(() -> new RuntimeException("Title not found"));

        Rating rating = ratingRepository.findByUserIdAndTitleId(userId, request.getTitleId())
                .orElse(new Rating());

        rating.setUser(user);
        rating.setTitle(title);
        rating.setRating(request.getRating());

        Rating saved = ratingRepository.save(rating);

        return new RatingResponse(
                saved.getId(),
                saved.getTitle().getId(),
                saved.getTitle().getTitle(),
                saved.getRating()
        );
    }

    @Override
    public List<RatingResponse> getRatingsByUser(UUID userId) {
        return ratingRepository.findByUserId(userId)
                .stream()
                .map(rating -> new RatingResponse(
                        rating.getId(),
                        rating.getTitle().getId(),
                        rating.getTitle().getTitle(),
                        rating.getRating()
                ))
                .toList();
    }

    @Override
    public List<RatingResponse> getRatingsByTitle(Long titleId) {
        return ratingRepository.findByTitleId(titleId)
                .stream()
                .map(rating -> new RatingResponse(
                        rating.getId(),
                        rating.getTitle().getId(),
                        rating.getTitle().getTitle(),
                        rating.getRating()
                ))
                .toList();
    }

    @Override
    public void deleteRating(UUID userId, Long titleId) {
        ratingRepository.deleteByUserIdAndTitleId(userId, titleId);
    }
}