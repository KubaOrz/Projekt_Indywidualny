package pl.edu.pw.ee.individualproject.order;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;
import pl.edu.pw.ee.individualproject.order.DTO.BasicOrderData;
import pl.edu.pw.ee.individualproject.order.DTO.OrderItemDTO;
import pl.edu.pw.ee.individualproject.order.DTO.OrderRequest;
import pl.edu.pw.ee.individualproject.products.Product;
import pl.edu.pw.ee.individualproject.products.ProductService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
                .orderDate(LocalDateTime.now())
                .address(request.getAddress())
                .status(OrderStatus.ACTIVE)
                .build();

        newOrder = orderRepository.save(newOrder);

        List<OrderItem> shoppingList = new ArrayList<>();
        double totalPrice = 0;

        for (OrderItemDTO item: request.getProductList()) {
            Product product = productService.getProductById(item.productId());
            OrderItem orderItem = new OrderItem(
                    product,
                    item.count(),
                    newOrder.getId()
            );
            totalPrice += product.getPrice() * item.count();

            orderItemRepository.save(orderItem);
            shoppingList.add(orderItem);
        }

        newOrder.setShoppingList(shoppingList);
        newOrder.setTotalPrice(totalPrice);

        return orderRepository.save(newOrder);
    }

    public List<BasicOrderData> getUserActiveOrders(String email) {
        return orderRepository.findAllUserActiveOrders(email)
                .stream()
                .map(order -> extractBasicOrderData(order)).toList();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleiono zamówienia o id " + id)
        );
    }

    public Page<BasicOrderData> getAllActiveOrders(Pageable pageable) {
        Page<Order> activeOrders = orderRepository.findAll(pageable);

        List<BasicOrderData> activeOrdersData = activeOrders.getContent().stream()
                .map(order -> extractBasicOrderData(order))
                .toList();

        return new PageImpl<>(activeOrdersData, pageable, activeOrders.getTotalElements());
    }

    private String formatDate(LocalDateTime date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedDate = date.format(formatter);
        return date.format(formatter);
    }

    private BasicOrderData extractBasicOrderData(Order order) {
        return new BasicOrderData(
                order.getId(),
                order.getPurchaserEmail(),
                formatDate(order.getOrderDate()),
                formatDate(order.getDeliveryDate()),
                formatDate(order.getPickUpDate()),
                order.getAddress(),
                order.getStatus(),
                order.getTotalPrice()
        );
    }
}
