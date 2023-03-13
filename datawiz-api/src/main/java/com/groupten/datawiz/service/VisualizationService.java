package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.protocol.GraphResponse;

import java.util.List;

public interface VisualizationService {

    int saveVisualization(Visualization visualization);

    int editVisualization(Visualization visualization);

    Visualization getVisualizationById(int id);

    List<Visualization> getVisualizationsByConnectionId(int connectionId, int page);

    String deleteVisualization(int visualId);
    GraphResponse getData(int id);

}
