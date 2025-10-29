# Dịch vụ Thanh toán (Payment Service)

Đây là microservice chịu trách nhiệm xử lý mọi nghiệp vụ liên quan đến thanh toán trong hệ thống. Dịch vụ này tích hợp với các cổng thanh toán bên thứ ba (như VNPAY, MoMo, ZaloPay), tạo giao dịch, xử lý kết quả trả về, và cập nhật trạng thái đơn hàng.

## Tính năng (Features)

-   **Tạo yêu cầu thanh toán**: Tạo link thanh toán hoặc mã QR Code thông qua các cổng thanh toán.
-   **Xử lý Callback (IPN)**: Lắng nghe và xử lý dữ liệu callback từ cổng thanh toán để xác nhận giao dịch thành công hay thất bại.
-   **Xác thực Chữ ký (Signature Validation)**: Đảm bảo mọi dữ liệu nhận từ cổng thanh toán đều an toàn và không bị giả mạo.
-   **Truy vấn trạng thái giao dịch**: Cung cấp API để kiểm tra trạng thái của một giao dịch.
-   **Hoàn tiền (Refund)**: Tích hợp chức năng hoàn tiền cho các giao dịch (nếu cổng thanh toán hỗ trợ).

## Cài đặt (Installation)

1.  Clone repository này về máy của bạn.
2.  Cài đặt các thư viện cần thiết bằng lệnh:
    ```bash
    npm install
    ```

## Sử dụng (Usage)

1.  Tạo một file `.env` ở thư mục gốc của dự án bằng cách sao chép từ file `.env.example`.

    **Nội dung file `.env.example`:**
    ```
    # Service Configuration
    PORT=8082

    # Database
    MONGO_URI=mongodb://localhost:27017/payment_db

    # VNPAY Gateway Configuration
    VNPAY_TMNCODE=YOUR_TMNCODE
    VNPAY_HASH_SECRET=YOUR_HASH_SECRET
    VNPAY_URL=[https://sandbox.vnpayment.vn/paymentv2/vpcpay.html](https://sandbox.vnpayment.vn/paymentv2/vpcpay.html)
    VNPAY_RETURN_URL=http://localhost:3000/payment-result

    # MoMo Gateway Configuration
    MOMO_PARTNER_CODE=YOUR_PARTNER_CODE
    MOMO_ACCESS_KEY=YOUR_ACCESS_KEY
    MOMO_SECRET_KEY=YOUR_SECRET_KEY
    ```

2.  Điền các thông tin cấu hình của bạn vào file `.env`.

3.  Khởi động dịch vụ:
    -   Để chạy ở chế độ phát triển (tự động reload khi có thay đổi):
        ```bash
        npm run dev
        ```
    -   Để chạy ở chế độ production:
        ```bash
        npm start
        ```

## Các điểm cuối API (API Endpoints)

-   `POST /api/payment/create-vnpay`: Tạo một yêu cầu thanh toán qua VNPAY.
    -   **Body**: `{ "orderId": "string", "amount": number, "orderInfo": "string" }`
    -   **Response**: `{ "paymentUrl": "string" }`

-   `POST /api/payment/create-momo`: Tạo một yêu cầu thanh toán qua MoMo.
    -   **Body**: `{ "orderId": "string", "amount": number, "orderInfo": "string" }`
    -   **Response**: `{ "payUrl": "string", "qrCodeUrl": "string" }`

-   `GET /api/payment/callback/vnpay`: Lắng nghe callback (IPN) từ VNPAY.
    -   Đây là endpoint nội bộ để cổng thanh toán gọi về, không dành cho client.

-   `GET /api/payment/status/:orderId`: Kiểm tra trạng thái thanh toán của một đơn hàng.
    -   **Response**: `{ "orderId": "string", "status": "PENDING | SUCCESS | FAILED", "amount": number }`

## Đóng góp (Contributing)

Mọi đóng góp đều được chào đón! Vui lòng tạo một Pull Request hoặc mở một Issue để báo lỗi hoặc đề xuất tính năng mới.

## Giấy phép (License)

Dự án này được cấp phép theo [Giấy phép MIT](LICENSE).

// chatgpt tài trợ