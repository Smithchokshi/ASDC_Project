package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.*;
import com.groupten.datawiz.protocol.GraphRequest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public interface GraphRepository {

    List<GraphIntInt> getIntIntValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate);

    List<GraphFloatFloat> getFloatFloatValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate);

    List<GraphFloatInt> getFloatIntValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate);

    List<GraphIntFloat> getIntFloatValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate);

    List<GraphStringFloat> getStringFloatValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate);

    List<GraphStringInt> getStringIntValues(GraphRequest graphRequest, JdbcTemplate jdbcTemplate);
    Boolean testConnection(JdbcTemplate jdbcTemplate);




}
