package pl.edu.pw.ee.individualproject.user.DTO;

import pl.edu.pw.ee.individualproject.user.Role;

public record UserProfileData(
        String email,
        String name,
        String surname,
        String phoneNumber,
        Role role
) {
}
