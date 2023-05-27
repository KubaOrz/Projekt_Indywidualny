package pl.edu.pw.ee.individualproject.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;
import pl.edu.pw.ee.individualproject.user.DTO.BasicPurchaserData;
import pl.edu.pw.ee.individualproject.user.DTO.BasicSupplierData;
import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
