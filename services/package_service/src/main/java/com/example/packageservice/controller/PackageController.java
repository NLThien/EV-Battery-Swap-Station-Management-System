package com.example.packageservice.controller;

import com.example.packageservice.dto.CreatePackageRequest;
import com.example.packageservice.dto.PackageDTO;
import com.example.packageservice.model.PackageEntity;
import com.example.packageservice.service.PackageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class PackageController {

    private final PackageService service;

    public PackageController(PackageService service) {
        this.service = service;
    }

    @GetMapping
    public List<PackageDTO> getAllPackages() {
        return service.getAllPackages().stream().map(PackageDTO::new).collect(Collectors.toList());
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<PackageDTO> getPackageById(@PathVariable Long id) {
    //     return service.getPackageById(id)
    //             .map(pkg -> ResponseEntity.ok(new PackageDTO(pkg)))
    //             .orElse(ResponseEntity.notFound().build());
    // }

    @GetMapping("/type/{type}")
    public List<PackageDTO> getPackagesByType(@PathVariable String type) {
        return service.getPackagesByType(type).stream().map(PackageDTO::new).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<PackageDTO> createPackage(@RequestBody CreatePackageRequest req) {
        PackageEntity pkg = service.createPackage(req);
        return ResponseEntity.ok(new PackageDTO(pkg));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackageDTO> updatePackage(@PathVariable Long id, @RequestBody CreatePackageRequest req) {
        return service.updatePackage(id, req)
                .map(pkg -> ResponseEntity.ok(new PackageDTO(pkg)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        service.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
