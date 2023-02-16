package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.DbSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<DbSettings, Long> {
    Optional<DbSettings> findByConnectionId(Long Id);
}
