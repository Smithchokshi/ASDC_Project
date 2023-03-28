package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Dashboard;
import com.groupten.datawiz.protocol.DashboardResponse;
import com.groupten.datawiz.protocol.VisualisationList;

import java.util.List;

import java.util.List;

public interface DashboardService {

    Dashboard saveDashboard(Dashboard dashboard);

    List<String> getSchemas(int userId);
    List<VisualisationList> getVisualisationIds(int userid, String schema);
    DashboardResponse getDashboardGraphs(int id);

    void deleteDashboard(int id);

    List<Dashboard> getAllDashboards(int id, int pageNumber);


}
