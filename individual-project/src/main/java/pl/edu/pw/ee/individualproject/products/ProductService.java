package pl.edu.pw.ee.individualproject.products;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable) {
        Page<Product> products = productRepository.findByCategoryId(categoryId, pageable);
        if (products.isEmpty()) {
            throw new EntityNotFoundException();
        }
        return products;
    }

    public Page<Product> getProductsByName(String name, Pageable pageable) {
        Page<Product> products = productRepository.findByNameContaining(name, pageable);
        if (products.isEmpty()) {
            throw new EntityNotFoundException();
        }
        return products;
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

}
