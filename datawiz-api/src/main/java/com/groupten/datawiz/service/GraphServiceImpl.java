package com.groupten.datawiz.service;

import com.groupten.datawiz.config.DbConfig;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.Graph;
import com.groupten.datawiz.protocol.GraphRequest;
import com.groupten.datawiz.protocol.GraphResponse;
import com.groupten.datawiz.repository.GraphRepository;
import com.groupten.datawiz.repository.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class GraphServiceImpl implements GraphService {

    @Autowired
    GraphRepository graphRepository;
    @Autowired
    ConnectionRepository connectRepository;
    @Autowired
    DbConfig dbConfig;

    public GraphResponse getValues(GraphRequest graphRequest) {
        DbConn dbConn= connectRepository.findDbConnById(graphRequest.getConnectionId());
        var dataSource =  dbConfig.DbConnection(dbConn);
        var xvalues =graphRepository.getGraphValues(graphRequest.getTableNameOne(),graphRequest.getxColumn(), new JdbcTemplate(dataSource));

        var yvalues =graphRepository.getGraphValues(graphRequest.getTableNameTwo(),graphRequest.getyColumn(), new JdbcTemplate(dataSource));
        dataSource.close();

        var xvaluesFilter = xvalues.stream().filter(Objects::nonNull).toList();
        var yvaluesFilter = yvalues.stream().filter(Objects::nonNull).toList();


        return new GraphResponse(xvaluesFilter,yvaluesFilter);
    }
}
