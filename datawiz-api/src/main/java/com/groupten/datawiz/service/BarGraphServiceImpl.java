package com.groupten.datawiz.service;

import com.groupten.datawiz.config.DbConfig;
import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.Request;
import com.groupten.datawiz.repository.BarGraphRepository;
import com.groupten.datawiz.repository.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BarGraphServiceImpl implements BarGraphService {

    @Autowired
    BarGraphRepository barGraphRepository;
    @Autowired
    ConnectionRepository connectRepository;
    @Autowired
    DbConfig dbConfig;

    @Override
    public List<BarGraphInt> getValues(Request request) {
        DbConn dbConn= connectRepository.findById(request.getConnectionId()).get();
        return barGraphRepository.getValues(request, new JdbcTemplate(dbConfig.DbConnection(dbConn)));
    }
}
