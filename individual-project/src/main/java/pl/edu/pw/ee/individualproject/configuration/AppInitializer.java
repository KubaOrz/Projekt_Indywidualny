package pl.edu.pw.ee.individualproject.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.edu.pw.ee.individualproject.auth.AuthenticationService;
import pl.edu.pw.ee.individualproject.auth.RegisterRequest;
import pl.edu.pw.ee.individualproject.products.category.Category;
import pl.edu.pw.ee.individualproject.products.Product;
import pl.edu.pw.ee.individualproject.products.shop.Shop;
import pl.edu.pw.ee.individualproject.products.category.CategoryService;
import pl.edu.pw.ee.individualproject.products.ProductService;
import pl.edu.pw.ee.individualproject.products.shop.ShopService;
import pl.edu.pw.ee.individualproject.user.Role;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AppInitializer implements CommandLineRunner {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final ShopService shopService;
    private final AuthenticationService authenticationService;

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

        String filePath = "src/main/resources/images/picture.png";

        try {
            FileInputStream fileInputStream = new FileInputStream(filePath);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

            byte[] buffer = new byte[16384];
            int bytesRead;
            while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }

            fileInputStream.close();
            byteArrayOutputStream.close();

            byte[] imageData = byteArrayOutputStream.toByteArray();

            Shop[] shops = {Shop.builder().name("Biedronka").icon(imageData).build(),
                    Shop.builder().name("Lidl").icon(imageData).build(),
                    Shop.builder().name("Tesco").icon(imageData).build()};

            for (int i = 0; i < 3; i++) {
                Category currentCategory = categoryService.addCategory(Category.builder().name(categories[i]).image(imageData).build());
                for (String product: products[i]) {
                    for (Shop shop: shops) {
                        shopService.addShop(shop);
                        productService.addProduct(Product.builder()
                                .name(product)
                                .price(4.99)
                                .shopId(shop.getId())
                                .categoryId(currentCategory.getId())
                                .image(imageData)
                                .build());
                    }
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        authenticationService.register(new RegisterRequest(
                "Jakub",
                "Orzełowski",
                "orz.kuba@wp.pl",
                "1234",
                "123456789",
                Role.ROLE_USER
        ));

        authenticationService.register(new RegisterRequest(
                "Jakub",
                "Orzełowski",
                "orz.kub@wp.pl",
                "1234",
                "123456789",
                Role.ROLE_SUPPLIER
        ));
    }
}
