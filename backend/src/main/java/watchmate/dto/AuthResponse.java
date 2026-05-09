package watchmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private UUID userId;
    private String username;
    private String email;
    private String token;
}
