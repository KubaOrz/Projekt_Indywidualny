package pl.edu.pw.ee.individualproject.order.DTO;

import lombok.Builder;
import pl.edu.pw.ee.individualproject.order.OrderStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record BasicOrderData(
        Long id,
        String purchaserEmail,
        String orderDate,
        String pickUpDate,
        String deliveryDate,
        String address,
        OrderStatus status,
        double totalPrice
) {
}
