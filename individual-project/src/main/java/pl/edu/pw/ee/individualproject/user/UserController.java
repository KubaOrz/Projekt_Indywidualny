package pl.edu.pw.ee.individualproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserProfileData> getUserProfileData(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserProfileData(email));
    }
}
