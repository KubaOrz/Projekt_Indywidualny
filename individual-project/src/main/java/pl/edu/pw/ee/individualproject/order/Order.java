package pl.edu.pw.ee.individualproject.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;
import pl.edu.pw.ee.individualproject.user.BasicUserData;

import java.time.LocalDate;
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

    @Column(name = "purchaser_email")
    @NonNull
    private String purchaserEmail;

    @Column(name = "supplier")
    @Embedded
    private BasicUserData supplier;

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
