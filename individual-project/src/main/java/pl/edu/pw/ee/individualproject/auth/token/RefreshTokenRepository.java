package pl.edu.pw.ee.individualproject.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.ee.individualproject.user.User;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByUser(User user);

    Optional<RefreshToken> findByToken(String token);
}
