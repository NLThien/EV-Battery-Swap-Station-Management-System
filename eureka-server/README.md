1. Chạy Eureka Server:
    cd eureka-server
    mvn spring-boot:run

2. Chạy API Gateway:

    cd api-gateway  
    mvn spring-boot:run

3. Truy cập: http://localhost:8761
    Bạn sẽ thấy dashboard hiển thị:
        DS Replicas: Danh sách Eureka servers

        Instances currently registered with Eureka: Các service đã đăng ký

        Trong đó sẽ có: API-GATEWAY (status: UP)

4. Tắt server: Ctrl + C

🔍 Test hệ thống:
Sau khi chạy cả eureka-server và api-gateway:

Truy cập Eureka Dashboard: http://localhost:8761

Kiểm tra API Gateway health: http://localhost:8080/health

Xem registered services: http://localhost:8761/eureka/apps

📈 Khi có nhiều services:
Khi bạn thêm auth-service, battery-service, station-service, Eureka sẽ hiển thị:
INSTANCES REGISTERED:
- API-GATEWAY (1 instance)
- AUTH-SERVICE (1 instance) 
- BATTERY-SERVICE (1 instance)
- STATION-SERVICE (1 instance)

cập nhật JDK build docker
# Pull image
docker pull eclipse-temurin:11-jre

# Kiểm tra
docker images | findstr temurin