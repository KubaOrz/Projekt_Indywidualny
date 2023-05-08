package pl.edu.pw.ee.individualproject.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.purchaserEmail = :email AND o.status = 'ACTIVE' OR o.status = 'IN_PROGRESS'")
    List<Order> findAllUserActiveOrders(@Param("email") String email);

    Optional<Order> findById(Long id);
}
