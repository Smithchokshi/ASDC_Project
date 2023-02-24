package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphFloatInt;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GraphFloatIntRowMapper implements RowMapper <GraphFloatInt> {
    @Override
    public GraphFloatInt mapRow(ResultSet rs, int rowNum) throws SQLException {

        GraphFloatInt graphFloatInt= new GraphFloatInt();

        graphFloatInt.setX(rs.getFloat(1));
        graphFloatInt.setY(rs.getInt(2));

        return graphFloatInt;
    }
}
