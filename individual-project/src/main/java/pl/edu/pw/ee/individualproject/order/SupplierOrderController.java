package pl.edu.pw.ee.individualproject.order;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.ee.individualproject.order.DTO.BasicOrderData;

@RestController
@RequestMapping("/supplier/orders")
@RequiredArgsConstructor
public class SupplierOrderController {

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

    @GetMapping
    public ResponseEntity<Page<BasicOrderData>> getAllActiveOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BasicOrderData> activeOrders = orderService.getAllActiveOrders(pageable);
        return ResponseEntity.ok(activeOrders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
}
