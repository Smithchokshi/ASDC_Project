package com.groupten.datawiz.service;

import com.groupten.datawiz.config.DbConfig;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.UserDbInfo;
import com.groupten.datawiz.repository.ConnectionRepository;
import com.groupten.datawiz.repository.DbInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbInfoServiceImpl implements  DbInfoService{


    @Autowired
    DbConnService connService;

    @Autowired
    DbConfig dbConfig;

    @Autowired
    DbInfoRepository dbInfoRepository;

    @Override
    public List<String> getDatabases(UserDbInfo dbInfo){
        DbConn conn = connService.getConnById(dbInfo.getUserId());

        return dbInfoRepository.getDatabases(dbInfo,new JdbcTemplate(dbConfig.DbConnection(conn)));
    }

    @Override
    public List<String> getTables(UserDbInfo dbInfo){

        DbConn conn = connService.getConnById(dbInfo.getUserId());

        return dbInfoRepository.getTables(dbInfo,new JdbcTemplate(dbConfig.DbConnection(conn)));
    }

    @Override
    public List<String> getColumns(UserDbInfo dbInfo){
        DbConn conn = connService.getConnById(dbInfo.getUserId());
        return dbInfoRepository.getColumns(dbInfo,new JdbcTemplate(dbConfig.DbConnection(conn)));
    }


}
