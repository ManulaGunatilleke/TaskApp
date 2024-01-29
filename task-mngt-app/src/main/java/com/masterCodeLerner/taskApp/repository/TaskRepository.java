package com.masterCodeLerner.taskApp.repository;

import com.masterCodeLerner.taskApp.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findByUserId(Long userId);

    Optional<TaskEntity> findByUserIdAndTId(Long userId, Long TId);

    void deleteByUserIdAndTId(Long userId, Long TId);
}
