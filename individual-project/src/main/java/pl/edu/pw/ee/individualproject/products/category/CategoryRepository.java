package pl.edu.pw.ee.individualproject.products.category;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.ee.individualproject.products.category.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
