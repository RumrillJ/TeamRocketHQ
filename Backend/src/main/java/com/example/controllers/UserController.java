package com.example.controllers;

import com.example.DTOs.IncomingUserDTOLogin;
import com.example.DTOs.IncomingUserDTORegister;
import com.example.DTOs.OutgoingUserDTO;
import com.example.enums.RoleEnum;
import com.example.models.User;
import com.example.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){

        this.userService = userService;

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody IncomingUserDTOLogin userDTO, HttpSession session) {

        Optional<User> optionalUser = userService.loginUser(userDTO);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Login Failed");
        }
        User user = optionalUser.get();

        session.setAttribute("userId", user.getUserId());
        session.setAttribute("username", user.getUsername());
        session.setAttribute("role", user.getRole());

        return ResponseEntity.ok(new OutgoingUserDTO(user.getUserId(), user.getUsername(), user.getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody IncomingUserDTORegister userDTO){

        try{
            User user = userService.createUser(userDTO);
            OutgoingUserDTO userOut = new OutgoingUserDTO(user.getUserId(), user.getUsername(), user.getRole());
            return ResponseEntity.ok().body(userOut);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(HttpSession session){

        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).build();
        }
        if(session.getAttribute("role") != RoleEnum.valueOf("Captain")){
            return ResponseEntity.status(403).build();
        }
        List<OutgoingUserDTO> allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long userId, HttpSession session){

        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).build();
        }
        if(session.getAttribute("role") != RoleEnum.valueOf("Captain")){
            return ResponseEntity.status(403).build();
        }
        Optional<User> optUserToDelete = userService.findUserById(userId);
        try{
            userService.deleteUser(userId);
            return ResponseEntity.ok(new OutgoingUserDTO(optUserToDelete.get().getUserId(), optUserToDelete.get().getUsername(), optUserToDelete.get().getRole()));
        }catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }

    }

    @PatchMapping("/{userRole}/{userId}")
    public ResponseEntity<User> updataUserRole(@PathVariable RoleEnum userRole, @PathVariable Long userId){
        Optional<User> optUpdateUser = userService.findUserById(userId);
        if(optUpdateUser.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        User updateUser = optUpdateUser.get();
        updateUser.setRole(userRole);
        userService.updateUserStatus(updateUser);
        return ResponseEntity.accepted().body(updateUser);

    }

}
