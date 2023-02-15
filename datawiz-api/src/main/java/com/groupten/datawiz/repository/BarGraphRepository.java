package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.Request;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public interface BarGraphRepository {

    List<BarGraphInt> getValues(Request request, JdbcTemplate jdbcTemplate);
}
