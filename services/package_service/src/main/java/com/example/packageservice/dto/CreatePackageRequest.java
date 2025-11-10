package com.example.packageservice.dto;

import jakarta.validation.constraints.*;

public class CreatePackageRequest {
    @NotBlank
    private String type;

    @Min(1)
    @Max(10)
    private Integer quantity;

    private String description;

    @NotNull
    @Min(1)
    private Long price;

    // Getter & Setter
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getPrice() { return price; }
    public void setPrice(Long price) { this.price = price; }
}
