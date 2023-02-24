package com.groupten.datawiz.service;

import com.groupten.datawiz.model.GraphIntInt;
import com.groupten.datawiz.protocol.GraphRequest;

import java.util.List;

public interface GraphService {
    List<GraphIntInt> getValues(GraphRequest graphRequest);
}
