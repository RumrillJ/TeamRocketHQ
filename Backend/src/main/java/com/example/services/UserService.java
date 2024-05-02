package com.example.services;

import com.example.DAOs.UserDAO;
import com.example.DTOs.IncomingUserDTOLogin;
import com.example.DTOs.IncomingUserDTORegister;
import com.example.DTOs.OutgoingUserDTO;
import com.example.enums.RoleEnum;
import com.example.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO){
        this.userDAO = userDAO;

    }
    public User createUser(IncomingUserDTORegister userDTO) {
        if(userDTO.getUsername().isBlank() || userDTO.getUsername() == null){
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if(userDTO.getPassword().isBlank() || userDTO.getPassword() == null){
            throw new IllegalArgumentException("Password cannot be empty");
        }
        if(userDTO.getEmail().isBlank() || userDTO.getEmail() == null){
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if(userDTO.getFirstName().isBlank() || userDTO.getFirstName() == null){
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if(userDTO.getLastName().isBlank() || userDTO.getPassword() == null){
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        User newUser = new User(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword(), RoleEnum.valueOf("Grunt"));
        return userDAO.save(newUser);
    }

    public List<OutgoingUserDTO> getAllUsers() {
        List<OutgoingUserDTO> userDTOList = new ArrayList<>();
        userDTOList = userDAO.findAll().stream().map(OutgoingUserDTO::convertToDTOList).collect(Collectors.toList());
        return userDTOList;
    }

    public Optional<User> findUserById(Long userId){
        return userDAO.findById(userId);
    }

    public void deleteUser(Long userId) {

        userDAO.deleteById(userId);

    }

    public void updateUserStatus(User user) {
        userDAO.save(user);
    }

    public Optional<User> loginUser(IncomingUserDTOLogin userDTO) throws IllegalArgumentException{
        return userDAO.findByUsernameAndPassword(userDTO.getUsername(), userDTO.getPassword());
    }
}
