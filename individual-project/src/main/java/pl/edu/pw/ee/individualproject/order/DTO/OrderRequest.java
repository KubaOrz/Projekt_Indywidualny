package pl.edu.pw.ee.individualproject.order.DTO;

import lombok.*;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    @NonNull
    private String purchaserEmail;

    @NonNull
    private String address;

    @NonNull
    private List<OrderItemDTO> productList;

}
