package com.example.DAOs;

import com.example.enums.ReimbStatusEnum;
import com.example.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Long> {
    List<Reimbursement> findAllByUserUserId(Long userId);

    List<Reimbursement> findAllByStatus(ReimbStatusEnum reimbStatusEnum);

    List<Reimbursement> findAllByStatusAndUserUserId(ReimbStatusEnum reimbStatusEnum, Long userId);
}
