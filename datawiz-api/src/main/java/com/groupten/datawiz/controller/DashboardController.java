package com.groupten.datawiz.controller;

import com.groupten.datawiz.model.Dashboard;
import com.groupten.datawiz.protocol.Response;
import com.groupten.datawiz.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController extends Handler{

    @Autowired
    DashboardService ds;

    @PostMapping("/save")
    public ResponseEntity<Response> saveDashboard(@RequestBody Dashboard dashboard){
        Response response = new Response(ds.saveDashboard(dashboard), HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
