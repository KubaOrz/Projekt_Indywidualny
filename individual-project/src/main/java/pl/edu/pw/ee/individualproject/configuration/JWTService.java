package pl.edu.pw.ee.individualproject.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.auth.token.Token;
import pl.edu.pw.ee.individualproject.auth.token.TokenRepository;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;
import pl.edu.pw.ee.individualproject.exception.InvalidTokenException;

import java.security.Key;
import java.util.Date;

@Service
public class JWTService {

    private final String key;

    private final long tokenExpiration;

    private final long refreshTokenExpiration;

    private final TokenRepository tokenRepository;

    public JWTService(@Value("${jwt.key}") String key,
                      @Value("${jwt.token-expiration}") long tokenExpiration,
                      @Value("${jwt.refresh-token-expiration}") long refreshTokenExpiration,
                      TokenRepository tokenRepository) {
        this.key = key;
        this.tokenExpiration = tokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
        this.tokenRepository = tokenRepository;
    }

    public String getUserEmail(String token) {
        return getAllClaims(token).getSubject();
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValid(String token) {
        boolean isExpired = getExpirationDate(token).before(new Date(System.currentTimeMillis()));
        Token currentToken = tokenRepository.findByToken(token).orElseThrow(
                () -> new InvalidTokenException("No token in database!")
        );
        return !isExpired && !currentToken.isRevoked();
    }

    public boolean isValid(Token token) {
        boolean isExpired = getExpirationDate(token.getToken()).before(new Date(System.currentTimeMillis()));
        return !isExpired && !token.isRevoked();
    }

    public Date getExpirationDate(String token) {
        return getAllClaims(token).getExpiration();
    }

    private Claims getAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
