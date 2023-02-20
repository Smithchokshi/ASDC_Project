package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Lazy
@Repository
public class BarGraphRepositoryImpl implements BarGraphRepository {

    //JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//    @Autowired
//    private JdbcTemplate userJdbcTemplate();

    @Autowired
    private BarGraphPreparedStatements barGraphPreparedStatements;

    @Override
    public List<BarGraphInt> getValues(Request request, JdbcTemplate jdbcTemplate) {

        return jdbcTemplate.query(
                barGraphPreparedStatements.barGraphCountQuery(
                    request.getTableName(),
                    request.getxColumn(),
                    request.getyColumn()
                ),
                new BarGraphIntRowMapper()
        );
    }
}
