package com.groupten.datawiz.config;

import com.groupten.datawiz.model.DbSettings;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

@Service
public class DbConfig {

    public DataSource DbConnection(DbSettings DbSettings) {
        DataSourceBuilder<?> connectionBuilder = DataSourceBuilder.create();
        connectionBuilder.driverClassName(DbSettings.getDrive());
        connectionBuilder.url(DbSettings.getUrl());
        connectionBuilder.username(DbSettings.getUsername());
        connectionBuilder.password(DbSettings.getPassword());
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
