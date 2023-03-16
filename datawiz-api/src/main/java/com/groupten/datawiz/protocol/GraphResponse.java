package com.groupten.datawiz.protocol;

import java.util.List;

public class GraphResponse {

    private String graphType;
    private List<Object> x;
    private List<Object> y;

    public GraphResponse(List<Object> x, List<Object> y) {
        this.x = x;
        this.y = y;
    }

    public GraphResponse(String graphType, List<Object> x, List<Object> y) {
        this.graphType = graphType;
        this.x = x;
        this.y = y;
    }

    public String getGraphType() {
        return graphType;
    }

    public void setGraphType(String graphType) {
        this.graphType = graphType;
    }

    public List<Object> getX() {
        return x;
    }

    public void setX(List<Object> x) {
        this.x = x;
    }

    public List<Object> getY() {
        return y;
    }

    public void setY(List<Object> y) {
        this.y = y;
    }
}
