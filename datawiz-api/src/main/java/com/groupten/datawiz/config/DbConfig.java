package com.groupten.datawiz.config;

import com.groupten.datawiz.model.DbConn;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

@Service
public class DbConfig {

    public DataSource DbConnection(DbConn dbConn) {
        DataSourceBuilder<?> connectionBuilder = DataSourceBuilder.create();
        connectionBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        connectionBuilder.url(dbConn.getUrl());
        connectionBuilder.username(dbConn.getDb_username());
        connectionBuilder.password(dbConn.getDb_password());
        return connectionBuilder.build();
    }

    // TODO try beans
//    @Lazy
//    @Qualifier("UserJdbcTemplate")
//    @Bean
//    public JdbcTemplate UserJdbcTemplate() {
//        return new JdbcTemplate(UserDbConnection());
//    }
}
