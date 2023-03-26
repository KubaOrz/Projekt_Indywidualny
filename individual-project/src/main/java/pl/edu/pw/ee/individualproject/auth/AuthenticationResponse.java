package pl.edu.pw.ee.individualproject.auth;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import pl.edu.pw.ee.individualproject.user.User;

@Data
public class AuthenticationResponse {

    private final String token;
    private final String name;
    private final String surname;
    private final String email;
    private final String phoneNumber;

    @Autowired
    public AuthenticationResponse(String token, User user) {
        this.token = token;
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
    }
}
