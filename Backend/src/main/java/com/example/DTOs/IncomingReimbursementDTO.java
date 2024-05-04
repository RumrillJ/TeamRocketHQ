package com.example.DTOs;

import com.example.enums.ReimbStatusEnum;
import com.example.models.User;

public class IncomingReimbursementDTO {

    private String description;
    private Double amount;

    private ReimbStatusEnum status;

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, Double amount, ReimbStatusEnum status) {
        this.description = description;
        this.amount = amount;
        this.status = status;
    }

    public ReimbStatusEnum getStatus() {
        return status;
    }

    public void setStatus(ReimbStatusEnum status) {
        this.status = status;
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

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", status=" + status +
                '}';
    }
}
