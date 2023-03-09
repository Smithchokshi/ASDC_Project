package com.groupten.datawiz.service;
import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.repository.VisualizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class VisualizationServiceImpl implements VisualizationService{

    @Autowired
    VisualizationRepository visualizationRepository;

    @Override
    public int saveVisualization(Visualization visualization){
        Visualization visualizationSave = new Visualization(
                visualization.getConnectionId(),
                visualization.getUserId(),
                visualization.getName(),
                visualization.getChartType(),
                visualization.getxTable(),
                visualization.getxAttribute(),
                visualization.getyTable(),
                visualization.getyAttribute(),
                Timestamp.from(Instant.now())
        );
        return visualizationRepository.save(visualizationSave).getVisualizationId();
    }

    @Override
    public int editVisualization(Visualization visualization){
        Visualization visualizationUpdate = new Visualization(
                visualization.getVisualizationId(),
                visualization.getConnectionId(),
                visualization.getUserId(),
                visualization.getName(),
                visualization.getChartType(),
                visualization.getxTable(),
                visualization.getxAttribute(),
                visualization.getyTable(),
                visualization.getyAttribute(),
                Timestamp.from(Instant.now())
        );
        return visualizationRepository.save(visualizationUpdate).getVisualizationId();
    }

    @Override
    public Visualization getVisualizationById(int id){
        return visualizationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Visualization> getVisualizationsByConnectionId(int connectionId, int page) {
        Pageable pageable =  PageRequest.of(page, 6, Sort.by("updatedAt"));
        return visualizationRepository.findByConnectionIdAndDeletedAt(connectionId,null,pageable);
    }

}
