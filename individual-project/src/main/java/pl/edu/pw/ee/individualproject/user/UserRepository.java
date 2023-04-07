package pl.edu.pw.ee.individualproject.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.role = ?2")
    Optional<User> findByEmailAndRole(String email, Role role);
    boolean existsByEmail(String email);
}
