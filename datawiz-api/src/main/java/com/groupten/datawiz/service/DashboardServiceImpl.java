package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Dashboard;
import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.repository.DashboardRepository;
import com.groupten.datawiz.repository.VisualizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService{

    @Autowired
    DashboardRepository DR;

    @Autowired
    VisualizationRepository VR;

    @Override
    public Dashboard saveDashboard(Dashboard dashboard){
        Dashboard saveDashboard = new Dashboard(
                dashboard.getUserId(),
                dashboard.getVis1Id(),
                dashboard.getVis2Id(),
                dashboard.getVis3Id(),
                dashboard.getVis4Id(),
                dashboard.getVis5Id(),
                dashboard.getVis6Id()
        );
        return DR.save(saveDashboard);
    }
    public List<String> getSchemas(int userId){
        List<Visualization> visualizations=VR.findByUserId(userId);
        List<String> schemas=new ArrayList<String>();
        for(Visualization x:visualizations){
            if(!schemas.contains(x.getSchemaName())){
                schemas.add(x.getSchemaName());
            }
        }
        return schemas;
    }

    public List<Integer> getVisualisationIds(int userId,String schemaName){
        List<Visualization> visualizations=VR.findByUserIdAndSchemaName(userId,schemaName);
        List<Integer> visualisationIds=new ArrayList<Integer>();
        for(Visualization x:visualizations){
            if(!visualisationIds.contains(x.getVisualizationId())){
                visualisationIds.add(x.getVisualizationId());
            }
        }
        return visualisationIds;
    }
}
