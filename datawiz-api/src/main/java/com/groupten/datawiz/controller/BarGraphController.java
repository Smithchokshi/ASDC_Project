package com.groupten.datawiz.controller;

import com.groupten.datawiz.model.BarGraphInt;
import com.groupten.datawiz.model.Request;
import com.groupten.datawiz.service.BarGraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/graph/bar")
public class BarGraphController {

    @Autowired
    BarGraphService barGraphService;

    @PostMapping("/value")
    public ResponseEntity<List<BarGraphInt>> gatValues(@RequestBody Request request) {
        return ResponseEntity.status(HttpStatus.OK).body(barGraphService.getValues(request));
    }
}
