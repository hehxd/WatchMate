package watchmate.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SeriesProgressRequest {
    private Long titleId;
    private Integer lastSeason;
    private Integer lastEpisode;
    private String status;
}