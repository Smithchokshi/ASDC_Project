package com.groupten.datawiz.protocol;

public class GraphRequest {

    private String tableNameOne;

    private String tableNameTwo;
    private String xColumn;
    private String yColumn;
    private int connectionId;

    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getTableNameOne() {
        return tableNameOne;
    }

    public void setTableNameOne(String tableNameOne) {
        this.tableNameOne = tableNameOne;
    }

    public String getxColumn() {
        return xColumn;
    }

    public void setxColumn(String xColumn) {
        this.xColumn = xColumn;
    }

    public String getyColumn() {
        return yColumn;
    }

    public void setyColumn(String yColumn) {
        this.yColumn = yColumn;
    }
    public String getTableNameTwo() {
        return tableNameTwo;
    }

    public void setTableNameTwo(String tableNameTwo) {
        this.tableNameTwo = tableNameTwo;
    }
}
