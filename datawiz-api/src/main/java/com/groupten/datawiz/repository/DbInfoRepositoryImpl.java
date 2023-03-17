package com.groupten.datawiz.repository;

import com.groupten.datawiz.protocol.DbInfoRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class DbInfoRepositoryImpl implements DbInfoRepository{


    @Override
    public List<String> getDatabases(DbInfoRequest dbInfo, JdbcTemplate jdbcTemplate){

        return jdbcTemplate.query("show databases;",new DbInfoRowMapper());
    }

    @Override
    public List<String> getTables(DbInfoRequest dbInfo, JdbcTemplate jdbcTemplate){

        return jdbcTemplate.query("show tables from "+dbInfo.getSchema()+";",new DbInfoRowMapper());
    }

    @Override
    public List<String> getColumns(DbInfoRequest dbInfo, JdbcTemplate jdbcTemplate){

        return jdbcTemplate.query("show columns from "+dbInfo.getTable()+" in "+dbInfo.getSchema()+" ;",new DbInfoRowMapper());
    }

    @Override
    public List<String> getIntegerColumns(DbInfoRequest dbInfo, JdbcTemplate jdbcTemplate){
        List<String> intColumnNames=jdbcTemplate.query("select * from "+dbInfo.getSchema()+"."+dbInfo.getTable()+";",new IntegerColumnRowMapper());
        return Arrays.asList(intColumnNames.get(0).split("#"));
    }


}
