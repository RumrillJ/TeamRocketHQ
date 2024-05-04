package com.example.controllers;

import com.example.DTOs.IncomingReimbursementDTO;
import com.example.enums.ReimbStatusEnum;
import com.example.enums.RoleEnum;
import com.example.models.Reimbursement;
import com.example.models.User;
import com.example.services.ReimbursementService;
import com.example.services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reimbs")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReimbursementController {

    private ReimbursementService reimbursementService;
    private UserService userService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService, UserService userService){
        this.reimbursementService = reimbursementService;
        this.userService = userService;
    }
    @PostMapping("/reimb")
    public ResponseEntity<Object> insertReimbursement(@RequestBody IncomingReimbursementDTO reimbursement, HttpSession session){

        if(session.getAttribute("userId") == null) {
            return ResponseEntity.status(401).build();
        }
        Long sessUserId = (Long) session.getAttribute("userId");
        Reimbursement newReimb =  reimbursementService.createReimbursement(reimbursement, sessUserId);
        return ResponseEntity.ok(newReimb);
    }
    @GetMapping("/reimbForUser")
    public ResponseEntity<List<Reimbursement>> getReimbForUser(HttpSession session){
        if(session.getAttribute("userId") == null) {
            return ResponseEntity.status(401).build();
        }
        Long sessUserId = (Long) session.getAttribute("userId");
        List<Reimbursement> reimbs = reimbursementService.getAllReimsForUser(sessUserId);
        return ResponseEntity.ok(reimbs);

    }
    @GetMapping("/allReimbs")
    public ResponseEntity<List<Reimbursement>> getAllReimbs(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).build();
        }
        if(session.getAttribute("role") != RoleEnum.valueOf("Captain")){
            return ResponseEntity.status(403).build();
        }
        List<Reimbursement> reimbs = reimbursementService.getAllReims();

        return ResponseEntity.ok(reimbs);

    }
    @GetMapping("/reimbsByStatus/{reimbStatusEnum}")
    public ResponseEntity<List<Reimbursement>> getReimbsByStatus(@PathVariable("reimbStatusEnum") ReimbStatusEnum reimbStatusEnum, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).build();
        }
        List<Reimbursement> reimbs = reimbursementService.getReimbsByStatus(reimbStatusEnum);

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/reimbsByStatusAndUserId/{reimbStatusEnum}/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbsByStatusAndUser(@PathVariable ReimbStatusEnum reimbStatusEnum, @PathVariable Long userId){
        List<Reimbursement> reimbs = reimbursementService.getReimbsByStatusAndUserId(reimbStatusEnum, userId);

        return ResponseEntity.ok(reimbs);
    }

    @PutMapping("/updateReimbStatus/{reimbId}")
    public ResponseEntity<?> updateReimbStatus(@PathVariable Long reimbId, @RequestBody IncomingReimbursementDTO reimbursement, HttpSession session){

        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).build();
        }
        if(session.getAttribute("role") != RoleEnum.valueOf("Captain")){
            return ResponseEntity.status(403).build();
        }
        Optional<Reimbursement> optNewReimb = reimbursementService.findReimbById(reimbId);
        if(optNewReimb.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        optNewReimb.get().setStatus(reimbursement.getStatus());
        return ResponseEntity.accepted().body(reimbursementService.saveReimb(optNewReimb.get()));
    }
    @PatchMapping("/description/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbDescription(@RequestBody String reimbDescription, @PathVariable Long reimbId){
        Optional<Reimbursement> optReimb = reimbursementService.findReimbById(reimbId);

        Reimbursement reimb = optReimb.get();
        reimb.setDescription(reimbDescription);
        reimbursementService.saveReimb(reimb);
        return ResponseEntity.accepted().body(reimb);
    }
    /*
    @DeleteMapping("/{reimbId}")
    public ResponseEntity<Reimbursement> deleteReimbursement(@PathVariable Long reimbId){
        Optional<Reimbursement> optReimb = reimbursementService.findReimbById(reimbId);
        reimbursementService.deleteReimbursement()
    }
    */

}
