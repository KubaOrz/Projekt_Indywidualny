package pl.edu.pw.ee.individualproject.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.ee.individualproject.user.User;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);

    Optional<Token> findByUser(User user);

    List<Token> findAllByUser(User user);
}
