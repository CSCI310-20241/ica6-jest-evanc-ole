package edu.usc.csci310.ica.jest.controllers;

import edu.usc.csci310.ica.jest.requests.PingPongRequest;
import edu.usc.csci310.ica.jest.responses.PingPongResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/ping")
public class PingPongController {

    @PostMapping
    public ResponseEntity<PingPongResponse> playPingPong(@RequestBody PingPongRequest request) {
        PingPongResponse response = new PingPongResponse();
        response.setData("Pong " + request.getParam0() + ". Received at " + Instant.now() + ".");
        return ResponseEntity.ok().body(response);
    }
}
