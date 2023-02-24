package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphIntInt;
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
    public List<GraphIntInt> getValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate) {

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
    public Boolean testConnection(JdbcTemplate jdbcTemplate) {
        try {
            jdbcTemplate.queryForObject(preparedStatements.testConnection(), Integer.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
