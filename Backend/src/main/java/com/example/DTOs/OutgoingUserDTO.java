package com.example.DTOs;

import com.example.enums.RoleEnum;
import com.example.models.User;

import java.util.ArrayList;
import java.util.List;

public class OutgoingUserDTO {
    private Long userId;
    private String username;
    private RoleEnum role;
    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(Long userId, String username, RoleEnum role) {
        this.userId = userId;
        this.username = username;
        this.role = role;

    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public static OutgoingUserDTO convertToDTOList(User user){
        return new OutgoingUserDTO(user.getUserId(), user.getUsername(), user.getRole());
    }
    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role=" + role +
                '}';
    }
}
