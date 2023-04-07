package pl.edu.pw.ee.individualproject.auth;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import pl.edu.pw.ee.individualproject.user.Role;

@Data
@RequiredArgsConstructor
public class LoginRequest {

    private String email;
    private String password;
    private Role role;
}
