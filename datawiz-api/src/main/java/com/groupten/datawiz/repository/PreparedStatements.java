package com.groupten.datawiz.repository;

import org.springframework.stereotype.Component;

@Component
public class PreparedStatements {

    public String barGraphCountQuery(String tableName, String column){
         return "SELECT "+column+" FROM "+tableName;
    }

    public String testConnection(){
        return "SELECT 1";
    }
}
