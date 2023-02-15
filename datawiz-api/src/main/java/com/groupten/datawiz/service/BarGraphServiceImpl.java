package com.groupten.datawiz.service;

import com.groupten.datawiz.config.DbConfig;
import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.DbSettings;
import com.groupten.datawiz.model.Request;
import com.groupten.datawiz.repository.BarGraphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BarGraphServiceImpl implements BarGraphService {

    @Autowired
    BarGraphRepository barGraphRepository;

    @Autowired
    DbConfig dbConfig;

    @Override
    public List<BarGraphInt> getValues(Request request) {
        DbSettings dbSettings = new DbSettings(
                "",
                "",
                "",
                "com.mysql.cj.jdbc.Driver");
        return barGraphRepository.getValues(request, new JdbcTemplate(dbConfig.DbConnection(dbSettings)));
    }
}
