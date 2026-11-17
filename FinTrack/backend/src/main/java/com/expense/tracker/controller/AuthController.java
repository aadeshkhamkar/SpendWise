package com.expense.tracker.controller;

import com.expense.tracker.dto.AuthResponse;
import com.expense.tracker.dto.LoginRequest;
import com.expense.tracker.dto.SignupRequest;
import com.expense.tracker.dto.UserProfile;
import com.expense.tracker.entity.AppUser;
import com.expense.tracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        AppUser user = authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new AuthResponse(UserProfile.from(user), "Account created successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AppUser user = authService.login(request);
        return ResponseEntity.ok(new AuthResponse(UserProfile.from(user), "Login successful."));
    }
}
