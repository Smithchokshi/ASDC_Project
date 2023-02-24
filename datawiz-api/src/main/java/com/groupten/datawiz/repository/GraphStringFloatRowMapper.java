package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphStringFloat;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GraphStringFloatRowMapper implements RowMapper<GraphStringFloat> {
    @Override
    public GraphStringFloat mapRow(ResultSet rs, int rowNum) throws SQLException {


        GraphStringFloat graphStringFloat = new GraphStringFloat();

        graphStringFloat.setX(rs.getString(1));
        graphStringFloat.setY(rs.getFloat(2));

        return graphStringFloat;
    }
}
