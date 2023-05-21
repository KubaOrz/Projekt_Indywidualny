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
public class BasicSupplierData {
    private String supplierName;
    private String supplierSurname;
    private String supplierEmail;
    private String supplierPhoneNumber;
}
