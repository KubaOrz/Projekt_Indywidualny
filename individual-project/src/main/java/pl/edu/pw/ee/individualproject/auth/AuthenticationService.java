package pl.edu.pw.ee.individualproject.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.auth.token.*;
import pl.edu.pw.ee.individualproject.configuration.JWTService;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;
import pl.edu.pw.ee.individualproject.exception.InvalidTokenException;
import pl.edu.pw.ee.individualproject.exception.UserAlreadyExistsException;
import pl.edu.pw.ee.individualproject.user.User;
import pl.edu.pw.ee.individualproject.user.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(String.format("User %s already exists!", request.getEmail()));
        }
        User user = User.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole())
                .build();

        User savedUser = repository.save(user);
        String tokenStr = jwtService.generateToken(savedUser);
        Token token = Token.builder().token(tokenStr).user(user).revoked(false).build();
        tokenRepository.save(token);

        String refreshToken = jwtService.generateRefreshToken(savedUser);
        RefreshToken newRefreshToken = RefreshToken.builder().token(refreshToken).user(user).revoked(false).build();
        refreshTokenRepository.save(newRefreshToken);
        return new AuthenticationResponse(tokenStr, refreshToken, savedUser);
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = repository.findByEmail(request.getEmail()).orElseThrow(
                () -> new UsernameNotFoundException("User not found!")
        );

        Token token = tokenRepository.findByUser(user).orElseThrow(EntityNotFoundException::new);
        String tokenStr = jwtService.generateToken(user);
        token.setToken(tokenStr);

        RefreshToken refreshToken = refreshTokenRepository.findByUser(user).orElseThrow(EntityNotFoundException::new);
        String refreshTokenStr = jwtService.generateRefreshToken(user);
        refreshToken.setToken(refreshTokenStr);

        tokenRepository.save(token);
        refreshTokenRepository.save(refreshToken);
        return new AuthenticationResponse(tokenStr, refreshTokenStr, user);
    }

    public RefreshResponse refresh(String refreshToken) {
        String email = jwtService.getUserEmail(refreshToken);
        User user = repository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User not found!")
        );
        String tokenStr = jwtService.generateToken(user);
        String refreshTokenStr = jwtService.generateRefreshToken(user);

        RefreshToken newRefreshToken = refreshTokenRepository.findByToken(refreshToken).orElseThrow(
                InvalidTokenException::new
        );
        newRefreshToken.setToken(refreshTokenStr);
        refreshTokenRepository.save(newRefreshToken);

        Token token = tokenRepository.findByUser(user).orElseThrow(
                EntityNotFoundException::new
        );
        token.setToken(tokenStr);
        tokenRepository.save(token);
        return new RefreshResponse(tokenStr, refreshTokenStr);
    }
}
