package pl.edu.pw.ee.individualproject.order.DTO;

import pl.edu.pw.ee.individualproject.order.OrderStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
