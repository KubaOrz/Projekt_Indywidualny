package pl.edu.pw.ee.individualproject.order.DTO;

public record OrderStartRequest(
        Long orderId,
        String supplierEmail
) {
}
