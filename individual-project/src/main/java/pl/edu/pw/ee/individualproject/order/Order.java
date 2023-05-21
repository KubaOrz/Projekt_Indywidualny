package pl.edu.pw.ee.individualproject.order;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;
import pl.edu.pw.ee.individualproject.user.DTO.BasicPurchaserData;
import pl.edu.pw.ee.individualproject.user.DTO.BasicSupplierData;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "purchaser")
    @NonNull
    @Embedded
    private BasicPurchaserData purchaser;

    @Embedded
    @Column(name = "supplier")
    private BasicSupplierData supplier;

    @NonNull
    private LocalDateTime orderDate;

    private LocalDateTime pickUpDate;

    private LocalDateTime deliveryDate;

    @NonNull
    private String address;

    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> shoppingList;

    private double totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
