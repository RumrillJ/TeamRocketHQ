package com.example.DAOs;

import com.example.DTOs.OutgoingUserDTO;
import com.example.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO  extends JpaRepository<User, Long> {
    public User findByUsername(String username);

    Optional<User> findByUsernameAndPassword(String username, String password);

    User findByUserId(Long userId);
}
