package com.masterCodeLerner.taskApp.service;

import com.masterCodeLerner.taskApp.model.Task;

import java.util.List;

public interface TaskService {
    Task saveTask(Long userId, Task task);

    List<Task> getAllTasks();

    List<Task> getTasksByUId(Long userId);

    Task getTaskById(Long userId, Long taskId);

    boolean deleteTask(Long userId, Long taskId);

    Task updateTask(Long userId, Long taskId, Task task);
}
