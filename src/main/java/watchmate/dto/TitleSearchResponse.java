package watchmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TitleSearchResponse {
    private Long id;
    private String imdbId;
    private String title;
    private String type;
    private String yearText;
    private String posterUrl;
}