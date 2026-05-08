package watchmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RatingResponse {
    private Long id;
    private Long titleId;
    private String titleName;
    private Integer rating;
}
