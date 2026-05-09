package watchmate.service;

import watchmate.dto.TitleRequest;
import watchmate.dto.TitleResponse;
import watchmate.dto.TitleSearchResponse;

import java.util.List;

public interface TitleService {
    TitleResponse createTitle(TitleRequest request);
    TitleResponse getTitleById(Long id);
    List<TitleSearchResponse> searchTitles(String query);
    List<TitleSearchResponse> getAllTitles();
}
