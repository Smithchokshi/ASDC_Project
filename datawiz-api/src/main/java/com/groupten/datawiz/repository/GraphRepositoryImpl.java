package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.*;
import com.groupten.datawiz.protocol.GraphRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GraphRepositoryImpl implements GraphRepository {

    //JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//    @Autowired
//    private JdbcTemplate userJdbcTemplate();

    @Autowired
    private PreparedStatements preparedStatements;

    @Override
    public List<GraphIntInt> getIntIntValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {

        return jdbcTemplate.query(
                preparedStatements.barGraphCountQuery(
                    graphRequest.getTableName(),
                    graphRequest.getxColumn(),
                    graphRequest.getyColumn()
                ),
                new GraphIntIntRowMapper()
        );


    }

    @Override
    public List<GraphFloatFloat> getFloatFloatValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {

        return jdbcTemplate.query(
                preparedStatements.barGraphCountQuery(
                        graphRequest.getTableName(),
                        graphRequest.getxColumn(),
                        graphRequest.getyColumn()
                ),
                new GraphFloatFloatRowMapper()
        );

    }

    @Override
    public List<GraphFloatInt> getFloatIntValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {


        return jdbcTemplate.query(
                preparedStatements.barGraphCountQuery(
                        graphRequest.getTableName(),
                        graphRequest.getxColumn(),
                        graphRequest.getyColumn()
                ),
                new GraphFloatIntRowMapper()
        );
    }

    @Override
    public List<GraphIntFloat> getIntFloatValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {


        return jdbcTemplate.query(
                preparedStatements.barGraphCountQuery(
                        graphRequest.getTableName(),
                        graphRequest.getxColumn(),
                        graphRequest.getyColumn()
                ),
                new GraphIntFloatRowMapper()
        );
    }

    @Override
    public List<GraphStringFloat> getStringFloatValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {


        return jdbcTemplate.query(
                preparedStatements.barGraphCountQuery(
                        graphRequest.getTableName(),
                        graphRequest.getxColumn(),
                        graphRequest.getyColumn()
                ),
                new GraphStringFloatRowMapper()
        );
    }

    @Override
    public List<GraphStringInt> getStringIntValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {


        return jdbcTemplate.query(
                preparedStatements.barGraphCountQuery(
                        graphRequest.getTableName(),
                        graphRequest.getxColumn(),
                        graphRequest.getyColumn()
                ),
                new GraphStringIntRowMapper()
        );
    }

    @Override
    public Boolean testConnection(JdbcTemplate jdbcTemplate) {
        try {
            jdbcTemplate.queryForObject(preparedStatements.testConnection(), Integer.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
