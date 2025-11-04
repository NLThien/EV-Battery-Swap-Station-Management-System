package com.example.station_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class StationManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(StationManagementApplication.class, args);
	}
}
