import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "payment_logs")
@Data
public class PaymentLog {
    @Id
    private String id;
    private String orderId;
    private String userId;
    private Double amount;
    private String status; // PENDING, PAID, FAILED
    private String gatewayTxnRef; // Mã của Sepay
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = new Date();
        this.status = "PENDING";
    }
}   @PrePersist
    protected void onCreate() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = new Date();
        this.status = "PENDING";
    }
}