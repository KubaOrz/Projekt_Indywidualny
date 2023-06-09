package pl.edu.pw.ee.individualproject.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.purchaser.purchaserEmail = :email AND o.status = 'ACTIVE' OR o.status = 'IN_PROGRESS'")
    List<Order> findAllUserActiveOrders(@Param("email") String email);

    @Query("SELECT o FROM Order o WHERE o.status = 'ACTIVE'")
    Page<Order> findAllUntakenOrders(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.supplier.supplierEmail = :email AND o.status = 'IN_PROGRESS'")
    List<Order> findAllSupplierInProgressOrders(@Param("email") String email);

    @Query("SELECT o FROM Order o WHERE o.purchaser.purchaserEmail = :email AND o.status = 'DELIVERED'")
    Page<Order> findAllUserDeliveredOrders(Pageable pageable, @Param("email") String email);

    @Query("SELECT o FROM Order o WHERE o.supplier.supplierEmail = :email AND o.status = 'DELIVERED'")
    Page<Order> findAllSupplierDeliveredOrders(Pageable pageable, @Param("email") String email);

    Optional<Order> findById(Long id);

    Page<Order> findAll(Pageable pageable);
}
