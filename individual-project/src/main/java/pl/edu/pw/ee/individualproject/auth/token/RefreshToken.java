package pl.edu.pw.ee.individualproject.auth.token;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import pl.edu.pw.ee.individualproject.user.User;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private boolean revoked;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
