package com.example.controllers;

import com.example.enums.ReimbStatusEnum;
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
    @PostMapping("/reimb/{userId}")
    public ResponseEntity<Object> insertReimbursement(@RequestBody Reimbursement reimbursement, @PathVariable Long userId, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).build();
        }
        Optional<User> reimbUserById = userService.findUserById(userId);
        if(reimbUserById.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        User user = reimbUserById.get();
        reimbursement.setUser(user);
        Reimbursement newReimb =  reimbursementService.createReimbursement(reimbursement);
        return ResponseEntity.ok(newReimb);
    }
    @GetMapping("/reimbForUser/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbForUser(@PathVariable Long userId){
        List<Reimbursement> reimbs = reimbursementService.getAllReimsForUser(userId);

        return ResponseEntity.ok(reimbs);

    }
    @GetMapping("/allReimbs")
    public ResponseEntity<List<Reimbursement>> getAllReimbs(){
        List<Reimbursement> reimbs = reimbursementService.getAllReims();

        return ResponseEntity.ok(reimbs);

    }
    @GetMapping("/reimbsByStatus/{reimbStatusEnum}")
    public ResponseEntity<List<Reimbursement>> getReimbsByStatus(@PathVariable("reimbStatusEnum") ReimbStatusEnum reimbStatusEnum){
        List<Reimbursement> reimbs = reimbursementService.getReimbsByStatus(reimbStatusEnum);

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/reimbsByStatusAndUserId/{reimbStatusEnum}/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbsByStatusAndUser(@PathVariable ReimbStatusEnum reimbStatusEnum, @PathVariable Long userId){
        List<Reimbursement> reimbs = reimbursementService.getReimbsByStatusAndUserId(reimbStatusEnum, userId);

        return ResponseEntity.ok(reimbs);
    }

    @PatchMapping("/{reimbStatus}/{reimbStatusId}")
    public ResponseEntity<Reimbursement> updateReimbStatus(@Valid @PathVariable ReimbStatusEnum reimbStatus, @PathVariable Long reimbStatusId){
        Optional<Reimbursement> optNewReimb = reimbursementService.findReimbById(reimbStatusId);
        if(optNewReimb.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Reimbursement newReimb = optNewReimb.get();
        newReimb.setStatus(reimbStatus);
        reimbursementService.updateReimbStatus(newReimb);
        return ResponseEntity.accepted().body(newReimb);


    }
    @PatchMapping("/description/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbDescription(@RequestBody String reimbDescription, @PathVariable Long reimbId){
        Optional<Reimbursement> optReimb = reimbursementService.findReimbById(reimbId);

        Reimbursement reimb = optReimb.get();
        reimb.setDescription(reimbDescription);
        reimbursementService.saveReimb(reimb);
        return ResponseEntity.accepted().body(reimb);
    }
}
