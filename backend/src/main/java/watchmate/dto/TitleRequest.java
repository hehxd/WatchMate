package watchmate.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TitleRequest {
    private String imdbId;
    private String title;
    private String type;
    private String yearText;
    private String plot;
    private String posterUrl;
    private String imdbRating;
    private Integer totalSeasons;
}
