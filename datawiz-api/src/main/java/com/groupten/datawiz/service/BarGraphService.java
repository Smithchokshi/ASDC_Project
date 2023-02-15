package com.groupten.datawiz.service;

import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.Request;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BarGraphService {
    List<BarGraphInt> getValues(Request request);
}
