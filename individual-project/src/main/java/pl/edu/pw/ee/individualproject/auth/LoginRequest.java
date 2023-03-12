package pl.edu.pw.ee.individualproject.auth;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginRequest {

    private String email;
    private String password;
}
