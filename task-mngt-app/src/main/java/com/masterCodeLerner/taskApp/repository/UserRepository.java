package com.masterCodeLerner.taskApp.repository;

import com.masterCodeLerner.taskApp.entity.TaskEntity;
import com.masterCodeLerner.taskApp.entity.UserEntity;
import com.masterCodeLerner.taskApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmailIdAndPassword(String emailId, String password);
}
