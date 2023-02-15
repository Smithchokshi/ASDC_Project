package com.groupten.datawiz.model;

public class DbSettings {

    private String url;
    private String username;
    private String password;
    private String drive;

    public DbSettings(String url, String username, String password, String drive) {
        this.url = url;
        this.username = username;
        this.password = password;
        this.drive = drive;
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

    public String getDrive() {
        return drive;
    }

    public void setDrive(String drive) {
        this.drive = drive;
    }
}
