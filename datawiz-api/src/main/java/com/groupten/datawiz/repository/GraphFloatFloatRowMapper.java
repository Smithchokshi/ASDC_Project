package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphFloatFloat;
import com.groupten.datawiz.model.GraphFloatInt;
import com.groupten.datawiz.model.GraphIntInt;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GraphFloatFloatRowMapper implements RowMapper<GraphFloatFloat> {
    @Override
    public GraphFloatFloat mapRow(ResultSet rs, int rowNum) throws SQLException {

        GraphFloatFloat graphFloatFloat=new GraphFloatFloat();

        graphFloatFloat.setX(rs.getFloat(1));
        graphFloatFloat.setY(rs.getFloat(2));

        return graphFloatFloat;
    }
}
