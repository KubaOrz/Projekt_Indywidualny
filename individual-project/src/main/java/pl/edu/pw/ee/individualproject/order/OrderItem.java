package pl.edu.pw.ee.individualproject.order;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;
import pl.edu.pw.ee.individualproject.products.Product;

@Entity
@Data
@Table(name = "order_items")
public class OrderItem {

    public OrderItem(Product product, Integer count, Long orderId) {
        this.product = product;
        this.count = count;
        this.orderId = orderId;
    }

    public OrderItem() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id", insertable=false, updatable=false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "order_id")
    private Long orderId;

    private Integer count;

}
