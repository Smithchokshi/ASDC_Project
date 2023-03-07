package com.groupten.datawiz.service;

import com.groupten.datawiz.model.Visualization;

public interface VisualizationService {

    Visualization saveVisualization(Visualization visualization);

    Visualization editVisualization(Visualization visualization);

    Visualization getVisById(int id);
}
