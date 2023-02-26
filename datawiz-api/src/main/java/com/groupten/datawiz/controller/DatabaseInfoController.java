package com.groupten.datawiz.controller;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.UserDbInfo;
import com.groupten.datawiz.service.DbInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/DbInfo")
public class DatabaseInfoController {

    @Autowired
    DbInfoService dbInfoService;

    @PostMapping("/getDatabases")
    public ResponseEntity<List<String>> getDatabases(@RequestBody UserDbInfo dbinfo) {
        return ResponseEntity.status(HttpStatus.OK).body(dbInfoService.getDatabases(dbinfo));
    }

    @PostMapping("/getTables")
    public ResponseEntity<List<String>> getTables(@RequestBody UserDbInfo dbinfo) {
        return ResponseEntity.status(HttpStatus.OK).body(dbInfoService.getTables(dbinfo));
    }

    @PostMapping("/getColumns")
    public ResponseEntity<List<String>> getColumns (@RequestBody UserDbInfo dbinfo){
        return ResponseEntity.status(HttpStatus.OK).body(dbInfoService.getColumns(dbinfo));
    }


}