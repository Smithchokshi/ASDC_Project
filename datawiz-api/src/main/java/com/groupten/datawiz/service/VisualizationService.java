package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Visualization;

import java.util.List;

public interface VisualizationService {

    int saveVisualization(Visualization visualization);

    int editVisualization(Visualization visualization);

    Visualization getVisualizationById(int id);

    List<Visualization> getVisualizationsByConnectionId(int connectionId, int page);
}
