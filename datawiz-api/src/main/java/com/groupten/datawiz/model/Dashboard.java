package com.groupten.datawiz.model;
import jakarta.persistence.*;


@Entity
@Table(name = "dashboard")
public class Dashboard {

    @Id
    @Column(name = "dashboard_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int dashboardId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "vis1_id")
    private int vis1Id;

    @Column(name = "vis2_id")
    private Integer vis2Id;

    @Column(name = "vis3_id")
    private Integer vis3Id;

    @Column(name = "vis4_id")
    private Integer vis4Id;

    @Column(name = "vis5_id")
    private Integer vis5Id;

    @Column(name = "vis6_id")
    private Integer vis6Id;

    public Dashboard(){}

    public Dashboard(int userId, int vis1, Integer vis2, Integer vis3, Integer vis4, Integer vis5, Integer vis6){
        this.userId = userId;
        this.vis1Id = vis1;
        this.vis2Id = vis2;
        this.vis3Id = vis3;
        this.vis4Id = vis4;
        this.vis5Id = vis5;
        this.vis6Id = vis6;
    }

    public int getDashboardId() {
        return dashboardId;
    }

    public void setDashboardId(int dashboardId) {
        this.dashboardId = dashboardId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getVis1Id() {
        return vis1Id;
    }

    public void setVis1Id(int vis1Id) {
        this.vis1Id = vis1Id;
    }

    public Integer getVis2Id() {
        return vis2Id;
    }

    public void setVis2Id(Integer vis2Id) {
        this.vis2Id = vis2Id;
    }

    public Integer getVis3Id() {
        return vis3Id;
    }

    public void setVis3Id(Integer vis3Id) {
        this.vis3Id = vis3Id;
    }

    public Integer getVis4Id() {
        return vis4Id;
    }

    public void setVis4Id(Integer vis4Id) {
        this.vis4Id = vis4Id;
    }

    public Integer getVis5Id() {
        return vis5Id;
    }

    public void setVis5Id(Integer vis5Id) {
        this.vis5Id = vis5Id;
    }

    public Integer getVis6Id() {
        return vis6Id;
    }

    public void setVis6Id(Integer vis6Id) {
        this.vis6Id = vis6Id;
    }
}
