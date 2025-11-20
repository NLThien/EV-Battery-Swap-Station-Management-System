FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/order_service-0.0.1-SNAPSHOT.jar orderservice.jar

EXPOSE 3000

ENTRYPOINT [ "java", "-jar", "orderservice.jar" ]