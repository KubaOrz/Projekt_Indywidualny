package pl.edu.pw.ee.individualproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.ee.individualproject.auth.DTO.AuthenticationResponse;
import pl.edu.pw.ee.individualproject.user.DTO.ProfileEditionRequest;
import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserProfileData> getUserProfileData(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserProfileData(email));
    }

    @PutMapping
    public ResponseEntity<AuthenticationResponse> changeUserProfile(@RequestBody ProfileEditionRequest request) {
        return ResponseEntity.ok(userService.changeUserProfile(request));
    }
}
