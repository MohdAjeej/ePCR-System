package com.epcr.controller;

import com.epcr.model.User;
import com.epcr.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Login attempt for user: {}", loginRequest.getUsername());
            
            String token = authService.authenticateUser(
                    loginRequest.getUsername(), 
                    loginRequest.getPassword()
            );
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("type", "Bearer");
            
            logger.info("Login successful for user: {}", loginRequest.getUsername());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            logger.warn("Invalid credentials for user: {}", loginRequest.getUsername());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid credentials");
            error.put("message", "Username or password is incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        } catch (Exception e) {
            logger.error("Login error for user: {}", loginRequest.getUsername(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Login failed");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            logger.info("Registration attempt for user: {}", user.getUsername());
            
            // Validate required fields
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Validation failed");
                error.put("message", "Username is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Validation failed");
                error.put("message", "Email is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Validation failed");
                error.put("message", "Password is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            User registeredUser = authService.registerUser(user);
            logger.info("Registration successful for user: {}", user.getUsername());
            
            // Remove password from response
            registeredUser.setPassword(null);
            
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            logger.warn("Registration failed for user: {}", user.getUsername(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Registration failed");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            logger.error("Registration error for user: {}", user.getUsername(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Registration failed");
            error.put("message", "An unexpected error occurred. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Inner class for login request
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() {
            return username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
        
        public String getPassword() {
            return password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
