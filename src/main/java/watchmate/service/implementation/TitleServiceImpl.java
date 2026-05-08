package watchmate.service.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import watchmate.dto.TitleResponse;
import watchmate.dto.TitleRequest;
import watchmate.dto.TitleSearchResponse;
import watchmate.model.Title;
import watchmate.model.TitleType;
import watchmate.repository.TitleRepository;
import watchmate.service.TitleService;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TitleServiceImpl implements TitleService {

    private final TitleRepository titleRepository;

    @Override
    public TitleResponse createTitle(TitleRequest request) {
        if (titleRepository.existsByImdbId(request.getImdbId())) {
            throw new RuntimeException("Title with this IMDb ID already exists");
        }

        Title title = new Title();
        title.setImdbId(request.getImdbId());
        title.setTitle(request.getTitle());
        title.setType(parseTitleType(request.getType()));
        title.setYearText(request.getYearText());
        title.setPlot(request.getPlot());
        title.setPosterUrl(request.getPosterUrl());
        title.setImdbRating(parseRating(request.getImdbRating()));
        title.setTotalSeasons(request.getTotalSeasons());

        Title saved = titleRepository.save(title);
        return mapToTitleResponse(saved);
    }

    @Override
    public TitleResponse getTitleById(Long id) {
        Title title = titleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Title not found"));
        return mapToTitleResponse(title);
    }

    @Override
    public List<TitleSearchResponse> searchTitles(String query) {
        return titleRepository.findByTitleContainingIgnoreCase(query)
                .stream()
                .map(title -> new TitleSearchResponse(
                        title.getId(),
                        title.getImdbId(),
                        title.getTitle(),
                        title.getType().name(),
                        title.getYearText(),
                        title.getPosterUrl()
                ))
                .toList();
    }

    @Override
    public List<TitleSearchResponse> getAllTitles() {
        return titleRepository.findAll()
                .stream()
                .map(title -> new TitleSearchResponse(
                        title.getId(),
                        title.getImdbId(),
                        title.getTitle(),
                        title.getType().name(),
                        title.getYearText(),
                        title.getPosterUrl()
                ))
                .toList();
    }

    private TitleResponse mapToTitleResponse(Title title) {
        return new TitleResponse(
                title.getId(),
                title.getImdbId(),
                title.getTitle(),
                title.getType().name(),
                title.getYearText(),
                title.getPlot(),
                title.getPosterUrl(),
                title.getImdbRating() != null ? title.getImdbRating().toString() : null,
                title.getTotalSeasons()
        );
    }

    private TitleType parseTitleType(String type) {
        if (type == null) {
            throw new RuntimeException("Type is required");
        }

        return switch (type.toLowerCase()) {
            case "movie" -> TitleType.MOVIE;
            case "series" -> TitleType.SERIES;
            default -> throw new RuntimeException("Type must be MOVIE or SERIES");
        };
    }

    private BigDecimal parseRating(String value) {
        try {
            return value != null && !value.isBlank() ? new BigDecimal(value) : null;
        } catch (Exception e) {
            return null;
        }
    }
}
