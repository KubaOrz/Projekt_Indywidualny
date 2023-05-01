package pl.edu.pw.ee.individualproject.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "_products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    @Column(name = "shop_id")
    private Long shopId;

    @Lob
    @Column(length = 16384)
    private byte[] image;

    @Column(name = "category_id")
    private Long categoryId;

}
