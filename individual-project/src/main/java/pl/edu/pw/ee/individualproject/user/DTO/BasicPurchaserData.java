package pl.edu.pw.ee.individualproject.user.DTO;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicPurchaserData {
    private String purchaserName;
    private String purchaserEmail;
    private String purchaserPhoneNumber;
}