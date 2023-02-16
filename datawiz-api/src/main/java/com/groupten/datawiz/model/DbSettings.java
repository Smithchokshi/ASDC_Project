package com.groupten.datawiz.model;

import jakarta.persistence.*;
import org.springframework.data.relational.core.mapping.Table;

@Entity
@Table(name="connections")
public class DbSettings {

    @Id
    @Column(name = "connection_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long connectionId;
    @Column(name = "user_id")
    private Long userId;
    private String url;
    private String username;
    private String password;

    //  private String driver;

    public DbSettings(){}

    public DbSettings(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    public long getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(long connectionId) {
        this.connectionId = connectionId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
