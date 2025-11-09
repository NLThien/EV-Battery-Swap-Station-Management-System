import com.evbattery.paymentservice.model.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, String> {
    Optional<PaymentLog> findByGatewayTxnRef(String gatewayTxnRef);
}