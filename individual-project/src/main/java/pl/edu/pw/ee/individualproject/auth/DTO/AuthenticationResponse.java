package pl.edu.pw.ee.individualproject.auth.DTO;

import lombok.Data;
import pl.edu.pw.ee.individualproject.user.Role;
import pl.edu.pw.ee.individualproject.user.User;

@Data
public class AuthenticationResponse {

    private final String token;
    private final String refreshToken;
    private final String name;
    private final String surname;
    private final String email;
    private final String phoneNumber;
    private final Role role;

    public AuthenticationResponse(String token, String refreshToken, User user) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.role = user.getRole();
    }

    public AuthenticationResponse(User user) {
        this.token = null;
        this.refreshToken = null;
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.role = user.getRole();
    }
}
