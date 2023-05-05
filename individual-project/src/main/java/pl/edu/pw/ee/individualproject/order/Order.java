package pl.edu.pw.ee.individualproject.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;
import pl.edu.pw.ee.individualproject.user.BasicUserData;

import java.time.LocalDate;
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
    private LocalDate orderDate;

    @NonNull
    private String address;

    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> shoppingList;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
