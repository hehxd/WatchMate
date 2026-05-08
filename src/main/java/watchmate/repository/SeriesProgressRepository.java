package watchmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import watchmate.model.SeriesProgress;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SeriesProgressRepository extends JpaRepository<SeriesProgress, Long> {

    Optional<SeriesProgress> findByUserIdAndTitleId(UUID userId, Long titleId);

    List<SeriesProgress> findByUserId(UUID userId);
    
}