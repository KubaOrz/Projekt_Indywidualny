package pl.edu.pw.ee.individualproject.order.DTO;

import lombok.Builder;
import org.springframework.cglib.core.Local;
import pl.edu.pw.ee.individualproject.order.OrderStatus;

import java.time.LocalDateTime;

@Builder
public record BasicOrderData(
        Long id,
        String purchaserEmail,
        LocalDateTime orderDate,
        LocalDateTime pickUpDate,
        LocalDateTime deliveryDate,
        String address,
        OrderStatus status,
        double totalPrice
) {
}
