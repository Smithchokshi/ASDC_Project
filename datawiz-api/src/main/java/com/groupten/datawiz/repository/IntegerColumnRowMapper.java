package com.groupten.datawiz.repository;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class IntegerColumnRowMapper implements RowMapper<String> {

    @Override
    public String mapRow(ResultSet rs, int rowNum) throws SQLException {
        String ans="";
        ResultSetMetaData resultSetMetaData = rs.getMetaData();
        for (int i = 1; i <= resultSetMetaData.getColumnCount(); i++) {
            int type=resultSetMetaData.getColumnType(i);
            if(type==4 || type==6 || type ==8 || type ==-5 || type ==-6 || type ==5){
                ans+=resultSetMetaData.getColumnName(i)+"#";
            }
        }
//        System.out.println(ans);

        return ans;
    }
}
