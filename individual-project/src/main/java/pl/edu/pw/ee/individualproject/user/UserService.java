package pl.edu.pw.ee.individualproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public BasicUserData getBasicUserData(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                EntityNotFoundException::new
        );
        return new BasicUserData(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
}
