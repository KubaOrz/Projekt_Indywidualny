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

    // Test
//    @GetMapping("")
//    public ResponseEntity<Page<Order>> getAllOrders(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<Order> orders = orderService.getAllOrders(pageable);
//        return ResponseEntity.ok(orders);
//    }

    @PostMapping("")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        return new ResponseEntity<>(orderService.createOrder(request), HttpStatus.CREATED);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<BasicOrderData>> getUserActiveOrders(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getUserActiveOrders(email));
    }
}
