package pl.edu.pw.ee.individualproject.configuration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.auth.token.RefreshToken;
import pl.edu.pw.ee.individualproject.auth.token.RefreshTokenRepository;
import pl.edu.pw.ee.individualproject.auth.token.Token;
import pl.edu.pw.ee.individualproject.auth.token.TokenRepository;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authorizationHeader = request.getHeader("Authorization");
        final String token;
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return;
        }

        token = authorizationHeader.split(" ")[1];
        Token accessToken = tokenRepository.findByToken(token).orElseThrow(EntityNotFoundException::new);
        RefreshToken refreshToken = refreshTokenRepository.findByUser(accessToken.getUser()).orElseThrow(
                EntityNotFoundException::new
        );
        accessToken.setRevoked(true);
        refreshToken.setRevoked(true);
        tokenRepository.save(accessToken);
    }
}
