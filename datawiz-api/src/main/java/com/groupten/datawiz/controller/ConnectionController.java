package com.groupten.datawiz.controller;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.model.User;
import com.groupten.datawiz.service.DbConnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/connection")
public class ConnectionController {

    @Autowired
    DbConnService dbConnService;

    @PostMapping("/save")
    public ResponseEntity<DbConn> saveConn(@RequestBody DbConn dbConn) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dbConnService.saveConn(dbConn));
    }

    @GetMapping("/get/{id}")
    public DbConn getConnById(@PathVariable("id") int id){
        return dbConnService.getConnById(id);
    }

    @GetMapping("/getAll/{user_id}")
    public List<DbConn> getAllConnByUserId(@PathVariable("user_id") int user_id){
        return dbConnService.getAllConnByUserId(user_id);
    }
}
