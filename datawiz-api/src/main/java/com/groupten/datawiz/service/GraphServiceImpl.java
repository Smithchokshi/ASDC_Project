package com.groupten.datawiz.service;

import com.groupten.datawiz.config.DbConfig;
import com.groupten.datawiz.model.GraphIntInt;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.protocol.GraphRequest;
import com.groupten.datawiz.repository.GraphRepository;
import com.groupten.datawiz.repository.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GraphServiceImpl implements GraphService {

    @Autowired
    GraphRepository graphRepository;
    @Autowired
    ConnectionRepository connectRepository;
    @Autowired
    DbConfig dbConfig;

    @Override
    public List<GraphIntInt> getValues(GraphRequest graphRequest) {
        DbConn dbConn= connectRepository.findDbConnById(graphRequest.getConnectionId());
        return graphRepository.getIntIntValues(graphRequest, new JdbcTemplate(dbConfig.DbConnection(dbConn)));
    }
}
