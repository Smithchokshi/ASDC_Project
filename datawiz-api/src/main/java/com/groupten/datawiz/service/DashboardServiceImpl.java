package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Dashboard;
import com.groupten.datawiz.repository.DashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService{

    @Autowired
    DashboardRepository DR;

    @Override
    public Dashboard saveDashboard(Dashboard dashboard){
        Dashboard saveDashboard = new Dashboard(
                dashboard.getDashboardName(),
                dashboard.getUserId(),
                dashboard.getVis1Id(),
                dashboard.getVis2Id(),
                dashboard.getVis3Id(),
                dashboard.getVis4Id()
        );
        return DR.save(saveDashboard);
    }
}
