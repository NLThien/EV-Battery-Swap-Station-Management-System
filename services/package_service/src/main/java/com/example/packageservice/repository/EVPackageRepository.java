package com.example.packageservice.repository;

import com.example.packageservice.model.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EVPackageRepository extends JpaRepository<PackageEntity, Long> {
    List<PackageEntity> findByTypeIgnoreCase(String type);
}
