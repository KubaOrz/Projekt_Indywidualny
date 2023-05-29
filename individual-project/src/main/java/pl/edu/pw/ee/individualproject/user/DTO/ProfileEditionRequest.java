package pl.edu.pw.ee.individualproject.user.DTO;

public record ProfileEditionRequest(
        String currentEmail,
        String email,
        String name,
        String surname,
        String phoneNumber
) {
}
