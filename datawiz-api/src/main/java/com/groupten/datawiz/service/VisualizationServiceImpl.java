package com.groupten.datawiz.service;
import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.protocol.GraphRequest;
import com.groupten.datawiz.protocol.GraphResponse;
import com.groupten.datawiz.repository.VisualizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class VisualizationServiceImpl implements VisualizationService{

    @Autowired
    GraphService graphService;
    @Autowired
    VisualizationRepository visualizationRepository;

    @Override
    public int saveVisualization(Visualization visualization){
        Visualization visualizationSave = new Visualization(
                visualization.getConnectionId(),
                visualization.getSchemaName(),
                visualization.getUserId(),
                visualization.getName(),
                visualization.getChartType(),
                visualization.getxTable(),
                visualization.getxAttribute(),
                visualization.getyTable(),
                visualization.getyAttribute(),
                visualization.getCalculation(),
                Timestamp.from(Instant.now())
        );
        return visualizationRepository.save(visualizationSave).getVisualizationId();
    }

    @Override
    public int editVisualization(Visualization visualization){
        Visualization visualizationUpdate = new Visualization(
                visualization.getVisualizationId(),
                visualization.getConnectionId(),
                visualization.getSchemaName(),
                visualization.getUserId(),
                visualization.getName(),
                visualization.getChartType(),
                visualization.getxTable(),
                visualization.getxAttribute(),
                visualization.getyTable(),
                visualization.getyAttribute(),
                visualization.getCalculation(),
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

    @Override
    public String deleteVisualization(int visualId) {
        visualizationRepository.updateDeletedAtTime(visualId, Timestamp.from(Instant.now()));
        return "Deleted";
    }

    @Override
    public GraphResponse getData(int id){

        Visualization visualization=getVisualizationById(id);
        GraphRequest graphRequest=new GraphRequest();
        graphRequest.setConnectionId(visualization.getConnectionId());
        graphRequest.setSchemaName(visualization.getSchemaName());
        graphRequest.setTableNameOne(visualization.getxTable());
        graphRequest.setTableNameTwo(visualization.getyTable());
        graphRequest.setxColumn(visualization.getxAttribute());
        graphRequest.setyColumn(visualization.getyAttribute());
        graphRequest.setCalculation(visualization.getCalculation());

        GraphResponse graphServiceResponse = graphService.getGraphValues(graphRequest);

        return new GraphResponse(visualization.getChartType(), graphServiceResponse.getX(), graphServiceResponse.getY());
    }
}
