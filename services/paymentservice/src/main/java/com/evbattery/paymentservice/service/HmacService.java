package com.evbattery.paymentservice.service;

import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Service
public class HmacService {

    /**
     * Tính toán chữ ký HmacSHA256
     */
    public String calculateHmacSha256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            
            byte[] digest = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(digest);

        } catch (Exception e) {
            throw new RuntimeException("Không thể tính toán HMAC", e);
        }
    }
    
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder(2 * bytes.length);
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    /**
     * So sánh chữ ký một cách an toàn
     */
    public boolean isValidSignature(String payload, String signatureFromHeader, String secret) {
        String calculatedSignature = calculateHmacSha256(payload, secret);
        
        // Dùng MessageDigest.isEqual để chống "Timing Attacks"
        return java.security.MessageDigest.isEqual(
            calculatedSignature.getBytes(StandardCharsets.UTF_8),
            signatureFromHeader.getBytes(StandardCharsets.UTF_8)
        );
    }
}