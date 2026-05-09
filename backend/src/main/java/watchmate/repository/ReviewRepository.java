package watchmate.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import watchmate.model.Review;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByUserId(UUID userId);

    List<Review> findByTitleId(Long titleId);

}
