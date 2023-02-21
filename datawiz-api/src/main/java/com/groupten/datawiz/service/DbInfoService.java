package com.groupten.datawiz.service;

import com.groupten.datawiz.model.DbConn;

import java.util.List;

public interface DbInfoService {

    List<String> getDatabases(DbConn conn);
    List<String> getTables(DbConn conn);
    List<String> getColumns(DbConn conn);


}
