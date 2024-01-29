package com.masterCodeLerner.taskApp.controller;


import com.masterCodeLerner.taskApp.entity.TaskEntity;
import com.masterCodeLerner.taskApp.entity.UserEntity;
import com.masterCodeLerner.taskApp.model.User;
import com.masterCodeLerner.taskApp.repository.UserRepository;
import com.masterCodeLerner.taskApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        String emailId = loginUser.getEmailId();
        String password = loginUser.getPassword();

        Optional<UserEntity> userOptional = userRepository.findByEmailIdAndPassword(emailId, password);

        if (userOptional.isPresent()) {
            // User found, return the user details
            UserEntity userEntity = userOptional.get();
            User user = new User(
                    userEntity.getId(),
                    userEntity.getEmailId(),
                    userEntity.getName(),
                    userEntity.getPassword(),
                    userEntity.getRole()
            );
            return ResponseEntity.ok(user);
        } else {
            // User not found, return an error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = null;
        user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable("id") Long id) {
        boolean deleted = false;
        deleted =userService.deleteUser(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,
                                           @RequestBody User user) {
        user = userService.updateUser(id,user);
        return ResponseEntity.ok(user);
    }

}
