// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/payment") // <-- Khớp với đường dẫn của Gateway
// public class PaymentController {

//     @PostMapping("/initiate")
//     public ResponseEntity<String> initiatePayment(
//             @RequestBody PaymentRequestDto paymentRequest,
//             @RequestHeader("X-User-Id") String userId) { // <-- Nhận userId từ header

//         System.out.println("Nhận được yêu cầu thanh toán từ người dùng có ID: " + userId);
//         System.out.println("Thông tin đơn hàng: " + paymentRequest.getOrderId());

//         // ... Logic xử lý thanh toán của bạn ở đây ...
        
        
//         String responseMessage = "Thanh toán cho người dùng " + userId + " đang được xử lý.";
//         return ResponseEntity.ok(responseMessage);
//     }
// }
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import src.springframework.web.bind.annotation.RequestParam;

@org.springframework.stereotype.Controller


public class Controller {
    @Autowired
    private VNPayService vnPayService;


    @GetMapping("")
    public String home(){
        return "index";
    }

    @PostMapping("/submitOrder")
    public String submidOrder(@RequestParam("amount") int orderTotal,
                            @RequestParam("orderInfo") String orderInfo,
                            HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return "redirect:" + vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    public String GetMapping(HttpServletRequest request, Model model){
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

        return paymentStatus == 1 ? "ordersuccess" : "orderfail";
    }
}