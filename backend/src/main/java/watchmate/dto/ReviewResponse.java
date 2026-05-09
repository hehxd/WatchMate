package watchmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private Long titleId;
    private String titleName;
    private String username;
    private String commentText;
    private String createdAt;
}