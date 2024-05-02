package com.example.services;

import com.example.DAOs.ReimbursementDAO;
import com.example.enums.ReimbStatusEnum;
import com.example.models.Reimbursement;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO reimbursementDAO;

    public ReimbursementService(ReimbursementDAO reimbursementDAO){
        this.reimbursementDAO = reimbursementDAO;
    }

    public List<Reimbursement> getReimbsByStatus(ReimbStatusEnum reimbStatusEnum) {
        return reimbursementDAO.findAllByStatus(reimbStatusEnum);
    }

    public Reimbursement createReimbursement(Reimbursement reimbursement){
        return reimbursementDAO.save(reimbursement);
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

    public void updateReimbStatus(Reimbursement newReimb) {
        reimbursementDAO.save(newReimb);
    }

    public Optional<Reimbursement> findReimbById(Long reimbId) {
        return reimbursementDAO.findById(reimbId);
    }

    public Reimbursement saveReimb(Reimbursement reimb) {
        return reimbursementDAO.save(reimb);
    }
}
