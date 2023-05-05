package pl.edu.pw.ee.individualproject.order;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.order.DTO.OrderItemDTO;
import pl.edu.pw.ee.individualproject.order.DTO.OrderRequest;
import pl.edu.pw.ee.individualproject.products.ProductService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final OrderItemRepository orderItemRepository;

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Transactional
    public Order createOrder(OrderRequest request) {

        Order newOrder = Order.builder()
                .purchaserEmail(request.getPurchaserEmail())
                .orderDate(LocalDate.now())
                .address(request.getAddress())
                .status(OrderStatus.ACTIVE)
                .build();

        newOrder = orderRepository.save(newOrder);

        List<OrderItem> shoppingList = new ArrayList<>();

        for (OrderItemDTO item: request.getProductList()) {
            OrderItem orderItem = new OrderItem(
                    productService.getProductById(item.productId()),
                    item.count(),
                    newOrder.getId()
            );

            orderItemRepository.save(orderItem);
            shoppingList.add(orderItem);
        }

        newOrder.setShoppingList(shoppingList);

        return orderRepository.save(newOrder);
    }
}
