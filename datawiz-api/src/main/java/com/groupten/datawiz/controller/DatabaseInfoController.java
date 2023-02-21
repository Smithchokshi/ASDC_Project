package com.groupten.datawiz.controller;
import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.Request;
import com.groupten.datawiz.service.BarGraphService;
import com.groupten.datawiz.service.DbInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/DbInfo")
public class DatabaseInfoController {

    @Autowired
    DbInfoService dbInfoService;

    @PostMapping("/getDatabases")
    public ResponseEntity<List<String>> getDatabases(@RequestBody DbConn conn) {
        return ResponseEntity.status(HttpStatus.OK).body(dbInfoService.getDatabases(conn));
    }

    @PostMapping("/getTables")
    public ResponseEntity<List<String>> getTables(@RequestBody DbConn conn) {
        return ResponseEntity.status(HttpStatus.OK).body(dbInfoService.getTables(conn));
    }
        @PostMapping("/getColumns")
        public ResponseEntity<List<String>> getColumns (@RequestBody DbConn conn){
            return ResponseEntity.status(HttpStatus.OK).body(dbInfoService.getColumns(conn));

        }
    }