package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.GraphStringInt;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GraphStringIntRowMapper implements RowMapper<GraphStringInt> {
    @Override
    public GraphStringInt mapRow(ResultSet rs, int rowNum) throws SQLException {


        GraphStringInt graphStringInt =new GraphStringInt();

        graphStringInt.setX(rs.getString(1));
        graphStringInt.setY(rs.getInt(2));

        return graphStringInt;
    }
}
