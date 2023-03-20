package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Dashboard;

import java.util.List;

public interface DashboardService {

    Dashboard saveDashboard(Dashboard dashboard);

    List<String> getSchemas(int userId);
    List<Integer> getVisualisationIds(int userid, String schema);
}
