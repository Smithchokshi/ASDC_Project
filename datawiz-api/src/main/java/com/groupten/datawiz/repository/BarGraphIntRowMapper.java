package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.BarGraphInt;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BarGraphIntRowMapper implements RowMapper<BarGraphInt> {
    @Override
    public BarGraphInt mapRow(ResultSet rs, int rowNum) throws SQLException {

        BarGraphInt barGraphInt = new BarGraphInt();

        barGraphInt.setX(rs.getInt(1));
        barGraphInt.setY(rs.getInt(2));

        return barGraphInt;
    }
}
