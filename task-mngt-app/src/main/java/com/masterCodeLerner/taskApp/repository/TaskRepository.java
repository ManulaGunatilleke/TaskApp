package com.masterCodeLerner.taskApp.repository;

import com.masterCodeLerner.taskApp.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findByUId_Id(Long uId);

    Optional<TaskEntity> findByUId_IdAndTId(Long uId, Long tId);

    void deleteByUId_IdAndTId(Long uId, Long tId);

}
