package com.groupten.datawiz.service;
import com.groupten.datawiz.model.DbConn;
import java.util.*;

public interface DbConnService {

    DbConn saveConn(DbConn dbConn);

    DbConn getConnById(int id);

    List<DbConn> getAllConnByUserId(int user_id);
}
