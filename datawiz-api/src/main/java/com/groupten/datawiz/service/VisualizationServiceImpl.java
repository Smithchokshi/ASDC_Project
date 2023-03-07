package com.groupten.datawiz.service;
import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.protocol.GraphResponse;
import com.groupten.datawiz.repository.VisualizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Service
@Transactional
public class VisualizationServiceImpl implements VisualizationService{

    @Autowired
    VisualizationRepository VR;

    @Override
    public Visualization saveVisualization(Visualization visualization){
        Visualization newVis = new Visualization(visualization.getConnectionId(), visualization.getUserId(), visualization.getName(), visualization.getChartType(), visualization.getxTable(), visualization.getxAttribute(), visualization.getyTable(), visualization.getyAttribute());
        return VR.save(newVis);
    }

    @Override
    public Visualization editVisualization(Visualization visualization){
        Visualization vis = getVisById(visualization.getVisualizationId());
        vis.setConnectionId(visualization.getConnectionId());
        vis.setUserId(visualization.getUserId());
        vis.setName(visualization.getName());
        vis.setChartType(visualization.getChartType());
        vis.setxTable(visualization.getxTable());
        vis.setxAttribute(visualization.getxAttribute());
        vis.setyTable(visualization.getyTable());
        vis.setyAttribute(visualization.getyAttribute());
        SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
        Calendar cal = Calendar.getInstance();
        String updated_at = dateFormat.format(cal.getTime());
        vis.setUpdated_at(updated_at);
        return VR.save(vis);
    }

    @Override
    public Visualization getVisById(int id){
        Visualization vis = VR.findById(id).orElse(null);
        return vis;
    }
}
