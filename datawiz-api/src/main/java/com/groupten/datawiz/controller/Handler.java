package com.groupten.datawiz.controller;

import com.groupten.datawiz.protocol.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;


public class Handler {

    @ExceptionHandler()
    public ResponseEntity<Response> handleException(Exception ex) {

        Response response = new Response(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Response> handleMethodNotAllowed(HttpRequestMethodNotSupportedException ex) {
        Response response = new Response(null,HttpStatus.METHOD_NOT_ALLOWED.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(response);
    }
    // TODO 400,404
//    @ExceptionHandler(HttpServerErrorException.class)
//    public ResponseEntity<Response> handleBadRequest(HttpClientErrorException ex) {
//        Response response = new Response("",HttpStatus.NOT_FOUND.value(), ex.getMessage());
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//    }
}
