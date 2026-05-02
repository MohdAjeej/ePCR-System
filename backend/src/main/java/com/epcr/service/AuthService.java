package com.epcr.service;

import com.epcr.model.User;
import com.epcr.repository.UserRepository;
import com.epcr.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    public String authenticateUser(String username, String password) {
        try {
            logger.debug("Attempting authentication for user: {}", username);
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(authentication);
            
            logger.info("Authentication successful for user: {}", username);
            return token;
        } catch (BadCredentialsException e) {
            logger.warn("Bad credentials for user: {}", username);
            throw e;
        } catch (Exception e) {
            logger.error("Authentication error for user: {}", username, e);
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
    }
    
    public User registerUser(User user) {
        logger.debug("Registering new user: {}", user.getUsername());
        
        // Check if username exists
        if (userRepository.existsByUsername(user.getUsername())) {
            logger.warn("Registration failed - username already exists: {}", user.getUsername());
            throw new RuntimeException("Username already exists");
        }
        
        // Check if email exists
        if (userRepository.existsByEmail(user.getEmail())) {
            logger.warn("Registration failed - email already exists: {}", user.getEmail());
            throw new RuntimeException("Email already exists");
        }
        
        // Hash the password
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        logger.debug("Password hashed for user: {}", user.getUsername());
        
        // Set default role if none provided
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Set<String> roles = new HashSet<>();
            roles.add("USER");
            user.setRoles(roles);
            logger.debug("Default role 'USER' assigned to: {}", user.getUsername());
        }
        
        // Set active status
        user.setActive(true);
        
        // Set timestamps
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        // Save user
        User savedUser = userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());
        
        return savedUser;
    }
}
