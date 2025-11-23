FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy file jar đã build sẵn
COPY target/AuthenticationService-0.0.1-SNAPSHOT.jar app.jar

# (Tuỳ chọn) Dùng profile docker nếu bạn có application-docker.yml
ENV SPRING_PROFILES_ACTIVE=docker

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
