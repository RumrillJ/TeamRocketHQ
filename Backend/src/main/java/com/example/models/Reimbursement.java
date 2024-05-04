package com.example.models;

import com.example.enums.ReimbStatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "reimbursements")
@Component
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reimbId;
    private String description;
    private Double amount;
    @Enumerated(EnumType.STRING)
    private ReimbStatusEnum status;
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public Reimbursement() {
    }

    public Reimbursement(String description, Double amount, ReimbStatusEnum status, User user) {
        this.description = description;
        this.amount = amount;
        this.status = status;
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

    public ReimbStatusEnum getStatus() {
        return status;
    }

    public void setStatus(ReimbStatusEnum status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
