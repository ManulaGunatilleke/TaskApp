package com.masterCodeLerner.taskApp.service;

import com.masterCodeLerner.taskApp.entity.TaskEntity;
import com.masterCodeLerner.taskApp.entity.UserEntity;
import com.masterCodeLerner.taskApp.model.Task;
import com.masterCodeLerner.taskApp.model.User;
import com.masterCodeLerner.taskApp.repository.TaskRepository;
import org.springframework.beans.BeanUtils;
import com.masterCodeLerner.taskApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public class TaskNotFoundException extends RuntimeException {
        public TaskNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public Task saveTask(Long userId, Task task) {
        TaskEntity taskEntity = new TaskEntity();
        BeanUtils.copyProperties(task, taskEntity);

        // Check if user exists
        Optional<UserEntity> userEntityOptional = userRepository.findById(userId);

        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();

            // Set the user id for the task
            taskEntity.setUser(userEntity);

            // Save the task entity
            taskRepository.save(taskEntity);

            // Set the task id in the task model
            task.setTId(taskEntity.getTId());

            return task;
        } else {
            // Handle case where user does not exist
            return null;
        }
    }


    @Override
    public List<Task> getAllTasks() {
        List<TaskEntity> taskEntities = taskRepository.findAll();

        return taskEntities.stream()
                .map(this::convertEntityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Task> getTasksByUId(Long userId) {
        // Check if the user exists

        Optional<UserEntity> userEntityOptional = userRepository.findById(userId);

        if (userEntityOptional.isPresent()) {
            // User exists, fetch tasks related to the user
            List<TaskEntity> taskEntities = taskRepository.findByUId_Id(userId);

            // Convert TaskEntity list to Task list
            return taskEntities.stream()
                    .map(this::convertEntityToModel)
                    .collect(Collectors.toList());
        } else {
            // User does not exist, return an empty list or handle as needed
            return Collections.emptyList();
        }
    }

    @Override
    public Task getTaskById(Long userId, Long taskId) {
        Optional<TaskEntity> taskEntityOptional = taskRepository.findByUId_IdAndTId(userId, taskId);

        if (taskEntityOptional.isPresent()) {
            // Convert TaskEntity to Task model
            return convertEntityToModel(taskEntityOptional.get());
        } else {
            // Task with the given user id and task id not found
            return null;
        }
    }

    @Override
    public boolean deleteTask(Long userId, Long taskId) {
        Optional<TaskEntity> taskEntityOptional = taskRepository.findByUId_IdAndTId(userId, taskId);
        if (taskEntityOptional.isPresent()) {
            taskRepository.deleteByUId_IdAndTId(userId, taskId);
            return true;
        } else {
            throw new TaskNotFoundException("Task not found with ID: " + taskId);
        }
    }

    @Override
    public Task updateTask(Long userId, Long taskId, Task task) {
        Optional<TaskEntity> taskEntityOptional = taskRepository.findByUId_IdAndTId(userId, taskId);

        if (taskEntityOptional.isPresent()) {
            // Task with the given user id and task id found, update it
            TaskEntity taskEntity = taskEntityOptional.get();
            taskEntity.setTaskTitle(task.getTaskTitle());
            taskEntity.setTaskDescription(task.getTaskDescription());
            taskEntity.setPriority(task.getPriority());

            taskRepository.save(taskEntity);

            // Convert the updated entity to Task model
            return convertEntityToModel(taskEntity);
        } else {
            // Task with the given user id and task id not found, update failed
            return null;
        }
    }

    private Task convertEntityToModel(TaskEntity taskEntity) {
        Task task = new Task();
        BeanUtils.copyProperties(taskEntity, task);

        // Convert associated user
        if (taskEntity.getUId() != null) {
            User user = new User();
            BeanUtils.copyProperties(taskEntity.getUId(), user);
            task.setUser(user);
        }

        return task;
    }
}
