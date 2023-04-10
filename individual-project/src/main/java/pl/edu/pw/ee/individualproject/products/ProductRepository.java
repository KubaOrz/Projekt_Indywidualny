package pl.edu.pw.ee.individualproject.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(Long category_id, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
    Page<Product> findByNameContaining(String name, Pageable pageable);

}
