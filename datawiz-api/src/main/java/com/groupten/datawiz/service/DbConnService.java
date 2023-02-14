package com.groupten.datawiz.service;
import com.groupten.datawiz.model.DbConn;

public interface DbConnService {

    DbConn saveConn(DbConn dbConn);

    DbConn getConnById(int id);
}
