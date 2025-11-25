FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/paymentservice-0.0.1-SNAPSHOT.jar paymentservice.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "paymentservice.jar" ]