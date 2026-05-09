package watchmate.service;

import watchmate.dto.AuthResponse;
import watchmate.dto.LoginRequest;
import watchmate.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);

}
