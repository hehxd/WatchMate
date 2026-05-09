package watchmate.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import watchmate.model.Title;
import watchmate.model.TitleType;

import java.util.List;
import java.util.Optional;

public interface TitleRepository extends JpaRepository<Title, Long> {
    
    Optional<Title> findByImdbId(String imdbId);

    List<Title> findByTitleContainingIgnoreCase(String title);

    List<Title> findByType(TitleType type);

    boolean existsByImdbId(String imdbId);
    
}
