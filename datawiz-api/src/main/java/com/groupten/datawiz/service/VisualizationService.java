package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Visualization;

import java.util.List;

public interface VisualizationService {

    Visualization saveVisualization(Visualization visualization);

    Visualization editVisualization(Visualization visualization);

    Visualization getVisById(int id);

    List<Visualization> getVisualizationsByConnectionId(int connectionId, int page);
}
