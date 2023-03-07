package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.Visualization;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisualizationRepository extends JpaRepository<Visualization, Integer> {

    List<Visualization> findByConnectionId(Integer connectionID, Pageable pageable);
}
