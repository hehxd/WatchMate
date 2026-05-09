package watchmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SeriesProgressResponse {
    private Long id;
    private Long titleId;
    private String titleName;
    private Integer lastSeason;
    private Integer lastEpisode;
    private String status;
}