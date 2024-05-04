package com.example.services;

import com.example.DAOs.ReimbursementDAO;
import com.example.DAOs.UserDAO;
import com.example.DTOs.IncomingReimbursementDTO;
import com.example.enums.ReimbStatusEnum;
import com.example.enums.RoleEnum;
import com.example.models.Reimbursement;
import com.example.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO reimbursementDAO;
    private UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }

    public List<Reimbursement> getReimbsByStatus(ReimbStatusEnum reimbStatusEnum) {
        return reimbursementDAO.findAllByStatus(reimbStatusEnum);
    }

    public Reimbursement createReimbursement(IncomingReimbursementDTO reimbursement ,Long userId){
        Optional<User> reimbUserById = userDAO.findById(userId);
        Reimbursement newReimb = new Reimbursement(reimbursement.getDescription(), reimbursement.getAmount(), ReimbStatusEnum.valueOf("PENDING"), reimbUserById.get());
        return reimbursementDAO.save(newReimb);
    }

    public List<Reimbursement> getAllReimsForUser(Long userId) {
        return reimbursementDAO.findAllByUserUserId(userId);

    }

    public List<Reimbursement> getAllReims() {
        return reimbursementDAO.findAll();
    }

    public List<Reimbursement> getReimbsByStatusAndUserId(ReimbStatusEnum reimbStatusEnum, Long userId) {
        return reimbursementDAO.findAllByStatusAndUserUserId(reimbStatusEnum, userId);
    }

    public Optional<Reimbursement> findReimbById(Long reimbId) {
        return reimbursementDAO.findById(reimbId);
    }

    public Reimbursement saveReimb(Reimbursement reimb) {
        return reimbursementDAO.save(reimb);
    }
}
