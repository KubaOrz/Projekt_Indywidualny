package pl.edu.pw.ee.individualproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.auth.AuthenticationResponse;
import pl.edu.pw.ee.individualproject.auth.AuthenticationService;
import pl.edu.pw.ee.individualproject.auth.token.RefreshResponse;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;
import pl.edu.pw.ee.individualproject.exception.UserAlreadyExistsException;
import pl.edu.pw.ee.individualproject.user.DTO.BasicPurchaserData;
import pl.edu.pw.ee.individualproject.user.DTO.BasicSupplierData;
import pl.edu.pw.ee.individualproject.user.DTO.ProfileEditionRequest;
import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public BasicSupplierData getBasicSupplierData(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono dostawcy o podanym adresie email!")
        );
        return BasicSupplierData.builder()
                .supplierName(user.getName())
                .supplierSurname(user.getSurname())
                .supplierEmail(user.getEmail())
                .supplierPhoneNumber(user.getPhoneNumber())
                .build();
    }

    public BasicPurchaserData getBasicPurchaserData(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono zamawiającego o podanym adresie email!")
        );
        return BasicPurchaserData.builder()
                .purchaserName(user.getName())
                .purchaserEmail(user.getEmail())
                .purchaserPhoneNumber(user.getPhoneNumber())
                .build();
    }

    public AuthenticationResponse changeUserProfile(ProfileEditionRequest request) {
        User user = userRepository.findByEmail(request.currentEmail()).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono użytkownika o podanym adresie email!")
        );
        RefreshResponse refreshResponse = null;

        if (!Objects.equals(request.email(), request.currentEmail())) {
            if (!userRepository.existsByEmail(request.email())) {
                user.setEmail(request.email());
                refreshResponse = authenticationService.refresh(user);
            } else {
                throw new UserAlreadyExistsException("Inny użytkownik już używa tego adresu email!");
            }
        }

        user.setName(request.name());
        user.setSurname(request.surname());
        user.setPhoneNumber(request.phoneNumber());

        userRepository.save(user);

        if (refreshResponse != null) {
            return new AuthenticationResponse(refreshResponse.token(), refreshResponse.refreshToken(), user);
        }
        return new AuthenticationResponse(user);
    }

    public UserProfileData getUserProfileData(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono użytkownika o podanym adresie email!")
        );

        return new UserProfileData(
                user.getEmail(),
                user.getName(),
                user.getSurname(),
                user.getPhoneNumber(),
                user.getRole()
        );
    }
}
