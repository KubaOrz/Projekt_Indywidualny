package pl.edu.pw.ee.individualproject.order;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.ee.individualproject.order.DTO.BasicOrderData;
import pl.edu.pw.ee.individualproject.order.DTO.OrderStartRequest;

import java.util.List;

@RestController
@RequestMapping("/supplier")
@RequiredArgsConstructor
public class SupplierOrderController {

    private final OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<Page<BasicOrderData>> getAllActiveOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BasicOrderData> activeOrders = orderService.getAllActiveOrders(pageable);
        return ResponseEntity.ok(activeOrders);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/{email}/orders")
    public ResponseEntity<List<BasicOrderData>> getSupplierInProgressOrders(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getSupplierInProgressOrders(email));
    }

    @PutMapping("/orders")
    public ResponseEntity startOrder(@RequestBody OrderStartRequest orderStartRequest) {
        orderService.startOrder(orderStartRequest);
        return ResponseEntity.ok().build();
    }
}
