package com.groupten.datawiz.model;

import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Entity
@Table(name="connections")
public class DbConn {
    @Id
    @Column(name = "connection_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "user_id")
    private int userId;

    private String name;

    private String url;

    @Column(name = "username")
    private String db_username;

    @Column(name = "password")
    private String db_password;

    private String created_at;

    private String updated_at;

    private String deleted_at;

    @Column(name = "status")
    private boolean connStatus;

    public DbConn(){}

    public DbConn(int userId, String url, String name, String username, String password){
        this.userId = userId;
        this.url = url;
        this.name = name;
        db_username = username;
        db_password = password;
        SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
        Calendar cal = Calendar.getInstance();
        created_at = dateFormat.format(cal.getTime());
        updated_at = null;
        deleted_at = null;
        connStatus = false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int connectionId) {
        this.id = connectionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int conn_user_id) {
        this.userId = conn_user_id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDb_username() {
        return db_username;
    }

    public void setDb_username(String db_username) {
        this.db_username = db_username;
    }

    public String getDb_password() {
        return db_password;
    }

    public void setDb_password(String db_password) {
        this.db_password = db_password;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(String updated_at) {
        this.updated_at = updated_at;
    }

    public String getDeleted_at() {
        return deleted_at;
    }

    public void setDeleted_at(String deleted_at) {
        this.deleted_at = deleted_at;
    }

    public boolean isConnStatus() {
        return connStatus;
    }

    public void setConnStatus(boolean connStatus) {
        this.connStatus = connStatus;
    }
}