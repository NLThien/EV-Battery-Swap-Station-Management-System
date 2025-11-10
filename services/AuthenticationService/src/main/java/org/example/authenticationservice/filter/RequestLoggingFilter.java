package org.example.authenticationservice.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // --- Ghi log THÔNG TIN REQUEST ---
        log.info("🚀 REQUEST: Method={}, URI={}, ClientIP={}",
                request.getMethod(), // Lấy phương thức HTTP (GET, POST, v.v.)
                request.getRequestURI(),
                request.getRemoteAddr());

        // Tiếp tục chuỗi filter
        filterChain.doFilter(request, response);
    }
}