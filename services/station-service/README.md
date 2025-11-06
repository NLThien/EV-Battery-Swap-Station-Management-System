## Quick Start
1. Clone repository
2. Chạy: `docker-compose up -d`
3. Truy cập: http://localhost:8080

## Development
1. Copy `application-template.properties` thành `application.properties`
2. Chỉnh sửa thông tin database trong `application.properties`
3. Chạy MySQL: `docker-compose up mysql-db -d`
4. Chạy Spring Boot:

    # bước đầu tiên
    cd services  
    cd station-service
    cd station-management

    # chạy lần đầu
    mvn clean spring-boot:run

    # chạy service
    mvn spring-boot:run


##### TRIỂN KHAI TRÊN DOCKER

# Build tất cả services
docker-compose build

# Chạy toàn bộ stack
docker-compose up -d

# Chạy chỉ một số service
docker-compose up -d eureka-server mysql-station-db mysql-user-db
docker-compose up -d station-service user-service api-gateway
docker-compose up -d web-app

# Xem logs
docker-compose logs -f station-service
docker-compose logs -f eureka-server

# Scale service
docker-compose up -d --scale station-service=2

###### KIỂM TRA TRẠNG THÁI

# Kiểm tra containers
docker-compose ps

# Kiểm tra Eureka services
curl http://localhost:8761/eureka/apps

# Kiểm tra API Gateway
curl http://localhost:8080/actuator/health

###### DỪNG SERVICE

# Dừng services
docker-compose down

# Dừng và xóa volumes
docker-compose down -v

# Rebuild và chạy lại
docker-compose up -d --build

# Chạy với file compose khác
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

docker run -d `
  --name battery-station-mysql `
  -e MYSQL_ROOT_PASSWORD=root_password `
  -e MYSQL_DATABASE=battery_station_db `
  -e MYSQL_USER=station_user `
  -e MYSQL_PASSWORD=station_password `
  -p 3307:3306 `
  -v mysql_data:/var/lib/mysql `
  mysql:8.0
