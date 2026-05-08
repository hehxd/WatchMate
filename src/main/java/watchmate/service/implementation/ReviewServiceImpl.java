package watchmate.service.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import watchmate.dto.ReviewRequest;
import watchmate.dto.ReviewResponse;
import watchmate.model.Review;
import watchmate.model.Title;
import watchmate.model.User;
import watchmate.repository.ReviewRepository;
import watchmate.repository.TitleRepository;
import watchmate.repository.UserRepository;
import watchmate.service.ReviewService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;

    @Override
    public ReviewResponse createReview(UUID userId, ReviewRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Title title = titleRepository.findById(request.getTitleId())
                .orElseThrow(() -> new RuntimeException("Title not found"));

        Review review = new Review();
        review.setUser(user);
        review.setTitle(title);
        review.setCommentText(request.getCommentText());

        Review saved = reviewRepository.save(review);

        return new ReviewResponse(
                saved.getId(),
                saved.getTitle().getId(),
                saved.getTitle().getTitle(),
                saved.getUser().getUsername(),
                saved.getCommentText(),
                saved.getCreatedAt().toString()
        );
    }

    @Override
    public List<ReviewResponse> getReviewsByTitle(Long titleId) {
        return reviewRepository.findByTitleId(titleId)
                .stream()
                .map(review -> new ReviewResponse(
                        review.getId(),
                        review.getTitle().getId(),
                        review.getTitle().getTitle(),
                        review.getUser().getUsername(),
                        review.getCommentText(),
                        review.getCreatedAt().toString()
                ))
                .toList();
    }

    @Override
    public List<ReviewResponse> getReviewsByUser(UUID userId) {
        return reviewRepository.findByUserId(userId)
                .stream()
                .map(review -> new ReviewResponse(
                        review.getId(),
                        review.getTitle().getId(),
                        review.getTitle().getTitle(),
                        review.getUser().getUsername(),
                        review.getCommentText(),
                        review.getCreatedAt().toString()
                ))
                .toList();
    }
}