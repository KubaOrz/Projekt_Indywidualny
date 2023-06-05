package pl.edu.pw.ee.individualproject.order;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.ee.individualproject.order.DTO.BasicOrderData;
import pl.edu.pw.ee.individualproject.order.DTO.OrderRequest;

import java.util.List;

@RestController
@RequestMapping("/purchaser/orders")
@RequiredArgsConstructor
public class PurchaserOrderController {

    private final OrderService orderService;

    @PostMapping("")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        return new ResponseEntity<>(orderService.createOrder(request), HttpStatus.CREATED);
    }

    @GetMapping("/user-orders/{email}")
    public ResponseEntity<List<BasicOrderData>> getUserActiveOrders(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getUserActiveOrders(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/history/{email}")
    public ResponseEntity<Page<BasicOrderData>> getUserDeliveredOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @PathVariable String email) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BasicOrderData> orders = orderService.getUserDeliveredOrders(pageable, email);
        return ResponseEntity.ok(orders);
    }
}
