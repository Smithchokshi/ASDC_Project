package com.groupten.datawiz.controller;
import com.groupten.datawiz.model.Visualization;
import com.groupten.datawiz.protocol.Response;
import com.groupten.datawiz.service.VisualizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/visualization")
public class VisualizationController {

    @Autowired
    VisualizationService visualizationService;

    /*Example Visualization Save Request JSON:
    {
    "connectionId":3,
    "userId":1,
    "name":"vis1",
    "chartType":"bar",
    "xTable":"T1",
    "xAttribute":"att1",
    "yTable":"T2",
    "yAttribute":"att2"
    }
     */

    @PostMapping("/save")
    public ResponseEntity<Response> saveVisualization(@RequestBody Visualization visualization){
        Response response = new Response(visualizationService.saveVisualization(visualization), HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    /*
    Example Visualization Edit Request JSON (includes existing visualizationId):
    {
    "visualizationId":1,
    "connectionId":3,
    "userId":1,
    "name":"Uvis1",
    "chartType":"Ubar",
    "xTable":"UT1",
    "xAttribute":"Uatt1",
    "yTable":"UT2",
    "yAttribute":"Uatt2"
    }
     */

    @PostMapping("/edit")
    public ResponseEntity<Response> previewVisualization(@RequestBody Visualization visualization){
        Response response = new Response(visualizationService.editVisualization(visualization), HttpStatus.ACCEPTED.value(), HttpStatus.ACCEPTED.name());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @GetMapping("/get/{id}/{page}")
    public ResponseEntity<Response> getVisualization(@PathVariable("id") int connectionID, @PathVariable("page") int page){
        Response response = new Response(visualizationService.getVisualizationsByConnectionId(connectionID, page), HttpStatus.OK.value(), HttpStatus.OK.name() );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
