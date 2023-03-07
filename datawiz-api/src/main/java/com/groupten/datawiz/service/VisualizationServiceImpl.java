package com.groupten.datawiz.service;
import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.repository.VisualizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class VisualizationServiceImpl implements VisualizationService{

    @Autowired
    VisualizationRepository visualizationRepository;

    @Override
    public Visualization saveVisualization(Visualization visualization){
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
        return visualizationRepository.save(visualizationSave);
    }

    @Override
    public Visualization editVisualization(Visualization visualization){
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
        return visualizationRepository.save(visualizationUpdate);
    }

    @Override
    public Visualization getVisById(int id){
        Visualization vis = visualizationRepository.findById(id).orElse(null);
        return vis;
    }

    @Override
    public List<Visualization> getVisualizationsByConnectionId(int connectionId, int page) {
        Pageable pageable =  PageRequest.of(page, 6, Sort.by("updatedAt"));
        return visualizationRepository.findByConnectionId(connectionId,pageable);
    }

}
