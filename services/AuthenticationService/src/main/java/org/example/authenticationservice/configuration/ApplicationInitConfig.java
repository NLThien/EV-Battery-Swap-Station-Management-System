package org.example.authenticationservice.configuration;

import lombok.extern.slf4j.Slf4j;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.enums.Role;
import org.example.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.HashSet;

@Configuration
@Slf4j
public class ApplicationInitConfig {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            var roles = new HashSet<String>();
            roles.add(Role.ADMIN.name());
           if( userRepository.findAllByRolesContaining("ADMIN").isEmpty()){
               User user = User
                       .builder()
                       .firstName("Admin")
                       .phoneNumber("0123456789")
                       .password(passwordEncoder.encode("admin"))
                       .roles(roles)
                       .build();
               userRepository.save(user);
               log.warn("admin user has been created");
           }
        };
    }
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedHeaders("*")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowCredentials(true); // nếu có dùng cookie hoặc Authorization header
//
//
//            }
//        };
//    }


}
