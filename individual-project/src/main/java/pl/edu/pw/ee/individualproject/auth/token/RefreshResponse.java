package pl.edu.pw.ee.individualproject.auth.token;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class RefreshResponse {

    private final String token;
    private final String refreshToken;
}
