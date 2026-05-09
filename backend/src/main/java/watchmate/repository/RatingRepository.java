package watchmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import watchmate.model.Rating;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUserIdAndTitleId(UUID userId, Long titleId);

    List<Rating> findByUserId(UUID userId);

    List<Rating> findByTitleId(Long titleId);

    void deleteByUserIdAndTitleId(UUID userId, Long titleId);
    
}
