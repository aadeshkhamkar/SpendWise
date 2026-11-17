package com.expense.tracker.dto;

import com.expense.tracker.entity.AppUser;

public record UserProfile(Long id, String fullName, String email, String role) {
    public static UserProfile from(AppUser user) {
        return new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }
}
