package com.example.packageservice.service;

import com.example.packageservice.dto.CreatePackageRequest;
import com.example.packageservice.model.PackageEntity;
import com.example.packageservice.repository.EVPackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {

    private final EVPackageRepository repository;

    public PackageService(EVPackageRepository repository) {
        this.repository = repository;
    }

    public List<PackageEntity> getAllPackages() {
        return repository.findAll();
    }

    public List<PackageEntity> getPackagesByType(String type) {
        return repository.findByTypeIgnoreCase(type);
    }

    public PackageEntity createPackage(CreatePackageRequest req) {
        PackageEntity pkg = new PackageEntity(req.getType(), req.getQuantity(), req.getDescription(), req.getPrice());
        return repository.save(pkg);
    }

    public Optional<PackageEntity> updatePackage(Long id, CreatePackageRequest req) {
        return repository.findById(id).map(pkg -> {
            pkg.setType(req.getType());
            pkg.setQuantity(req.getQuantity());
            pkg.setDescription(req.getDescription());
            pkg.setPrice(req.getPrice());
            return repository.save(pkg);
        });
    }

    public void deletePackage(Long id) {
        repository.deleteById(id);
    }
}
