package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.*;
import com.groupten.datawiz.protocol.GraphRequest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public interface GraphRepository {

    List<Object> getGraphValues(String tableName,String columnName, JdbcTemplate jdbcTemplate);


    Boolean testConnection(JdbcTemplate jdbcTemplate);




}
