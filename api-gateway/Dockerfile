FROM eclipse-temurin:17-jre
VOLUME /tmp
COPY target/api-gateway-*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]