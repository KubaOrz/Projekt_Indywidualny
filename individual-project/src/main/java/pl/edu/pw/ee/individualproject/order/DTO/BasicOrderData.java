package pl.edu.pw.ee.individualproject.order.DTO;

import pl.edu.pw.ee.individualproject.order.OrderStatus;

import java.time.LocalDate;

public record BasicOrderData(
        Long id,
        String purchaserEmail,
        LocalDate orderDate,
        String address,
        OrderStatus status,
        double totalPrice
) {
}
