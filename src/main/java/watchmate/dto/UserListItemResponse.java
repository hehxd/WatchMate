package watchmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserListItemResponse {
    private Long id;
    private Long titleId;
    private String imdbId;
    private String title;
    private String type;
    private String posterUrl;
}