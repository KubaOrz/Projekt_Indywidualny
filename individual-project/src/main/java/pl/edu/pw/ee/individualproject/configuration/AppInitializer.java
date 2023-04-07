package pl.edu.pw.ee.individualproject.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.edu.pw.ee.individualproject.products.Category;
import pl.edu.pw.ee.individualproject.products.Product;
import pl.edu.pw.ee.individualproject.products.Shop;
import pl.edu.pw.ee.individualproject.products.CategoryService;
import pl.edu.pw.ee.individualproject.products.ProductService;
import pl.edu.pw.ee.individualproject.products.ShopService;

@Component
public class AppInitializer implements CommandLineRunner {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final ShopService shopService;

    @Autowired
    public AppInitializer(ProductService productService, CategoryService categoryService, ShopService shopService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.shopService = shopService;
    }

    @Override
    public void run(String... args) throws Exception {
        String[] fruits = {"banan", "jabłko", "brzoskwinia", "winogrona"};
        String[] vegetables = {"marchew", "pomidor", "ziemniak", "papryka"};
        String[] meat = {"pierś z kurczaka", "udko z kurczaka", "schab"};

        String[][] products = new String[3][];
        products[0] = fruits;
        products[1] = vegetables;
        products[2] = meat;

        String[] categories = {"Owoce", "Warzywa", "Mięso"};
        Shop[] shops = {Shop.builder().name("Biedronka").build(),
                Shop.builder().name("Lidl").build(),
                Shop.builder().name("Tesco").build()};

        for (int i = 0; i < 3; i++) {
            Category currentCategory = categoryService.addCategory(Category.builder().name(categories[i]).build());
            for (String product: products[i]) {
                for (Shop shop: shops) {
                    shopService.addShop(shop);
                    productService.addProduct(Product.builder()
                            .name(product)
                            .price(4.99)
                            .shop(shop)
                            .category(currentCategory).build());
                }
            }
        }
    }
}
