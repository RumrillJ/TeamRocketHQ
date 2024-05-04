package com.example.DTOs;

import com.example.models.User;

public class IncomingReimbursementDTO {

    private String description;
    private Double amount;

    private User user;
    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, Double amount, User user) {
        this.description = description;
        this.amount = amount;
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", user=" + user +
                '}';
    }
}
