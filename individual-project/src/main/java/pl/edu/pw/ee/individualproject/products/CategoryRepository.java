package pl.edu.pw.ee.individualproject.products;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.ee.individualproject.products.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
