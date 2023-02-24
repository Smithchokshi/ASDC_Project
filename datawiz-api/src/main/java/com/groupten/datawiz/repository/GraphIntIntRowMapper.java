package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphIntInt;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GraphIntIntRowMapper implements RowMapper<GraphIntInt> {
    @Override
    public GraphIntInt mapRow(ResultSet rs, int rowNum) throws SQLException {

        GraphIntInt graphIntInt = new GraphIntInt();

        graphIntInt.setX(rs.getInt(1));
        graphIntInt.setY(rs.getInt(2));

        return graphIntInt;
    }
}
