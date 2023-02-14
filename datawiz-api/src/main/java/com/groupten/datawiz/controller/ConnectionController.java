package com.groupten.datawiz.controller;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.User;
import com.groupten.datawiz.service.DbConnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/connection")
public class ConnectionController {

    @Autowired
    DbConnService dbConnService;

    /*@PostMapping("/save")
    public DbConn saveConn(@RequestBody DbConn dbConn){
        return dbConnService.saveConn(dbConn);
    }*/

    @PostMapping("/save")
    public ResponseEntity<DbConn> saveConn(@RequestBody DbConn dbConn) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dbConnService.saveConn(dbConn));
    }

    @GetMapping("/get/{id}")
    public DbConn getConnById(@PathVariable("id") int id){
        return dbConnService.getConnById(id);
    }
}
