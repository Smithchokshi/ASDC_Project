package com.groupten.datawiz.controller;

import com.groupten.datawiz.model.Dashboard;
import com.groupten.datawiz.protocol.Response;
import com.groupten.datawiz.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getSchemas/{userId}")
    public ResponseEntity<Response> getSchemas(@PathVariable("userId") int userId){
        Response response = new Response(ds.getSchemas(userId), HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getVisualisationIds/{userId}/{schema}")
    public ResponseEntity<Response> getVisualisationIds(@PathVariable("userId") int userId,@PathVariable("schema") String schema){
        Response response = new Response(ds.getVisualisationIds(userId,schema), HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
