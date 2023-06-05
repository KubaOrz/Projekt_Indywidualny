package pl.edu.pw.ee.individualproject.auth.DTO;

public record ChangePasswordRequest(
        String email,
        String oldPassword,
        String newPassword
) {
}
