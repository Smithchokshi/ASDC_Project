package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Dashboard;
import com.groupten.datawiz.protocol.DashboardResponse;

import java.util.List;

public interface DashboardService {

    Dashboard saveDashboard(Dashboard dashboard);

    DashboardResponse getDashboardGraphs(int id);

    void deleteDashboard(int id);

    List<Dashboard> getAllDashboards(int id, int pageNumber);


}