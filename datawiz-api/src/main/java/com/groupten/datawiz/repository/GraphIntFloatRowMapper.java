package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphIntFloat;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GraphIntFloatRowMapper implements RowMapper<GraphIntFloat> {
    @Override
    public GraphIntFloat mapRow(ResultSet rs, int rowNum) throws SQLException {


        GraphIntFloat graphIntFloat = new GraphIntFloat();

        graphIntFloat.setX(rs.getInt(1));
        graphIntFloat.setY(rs.getFloat(2));

        return graphIntFloat;
    }
}
