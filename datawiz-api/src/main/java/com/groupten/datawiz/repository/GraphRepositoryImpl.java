package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.*;
import com.groupten.datawiz.protocol.GraphRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GraphRepositoryImpl implements GraphRepository {

    @Autowired
    private PreparedStatements preparedStatements;

    @Override
    public List<Object> getGraphValues(String tableName,String columnName, JdbcTemplate jdbcTemplate) {

        return jdbcTemplate.queryForList(preparedStatements.barGraphCountQuery(tableName,columnName),Object.class);


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
