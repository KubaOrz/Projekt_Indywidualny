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

    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
