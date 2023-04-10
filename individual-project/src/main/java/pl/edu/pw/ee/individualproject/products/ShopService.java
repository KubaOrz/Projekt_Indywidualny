package pl.edu.pw.ee.individualproject.products;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.ee.individualproject.products.Shop;
import pl.edu.pw.ee.individualproject.products.ShopRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;

    public Shop addShop(Shop shop) {
        return shopRepository.save(shop);
    }

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }
}
