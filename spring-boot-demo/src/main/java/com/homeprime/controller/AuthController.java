package com.homeprime.controller;

import com.homeprime.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        // This is a demonstration controller for your job application
        // In a real app, you would use a Service and Repository
        System.out.println("Spring Boot Signup Request for: " + user.getEmail());
        
        // Return a mock success response
        return ResponseEntity.ok(user);
    }

    @GetMapping("/status")
    public String getStatus() {
        return "Spring Boot Backend is Running";
    }
}
