package pl.edu.pw.ee.individualproject.auth;

public record ChangePasswordRequest(
        String email,
        String oldPassword,
        String newPassword
) {
}
