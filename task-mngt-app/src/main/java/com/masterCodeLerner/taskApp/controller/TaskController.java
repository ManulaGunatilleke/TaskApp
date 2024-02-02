package com.masterCodeLerner.taskApp.controller;

import com.masterCodeLerner.taskApp.model.Task;
import com.masterCodeLerner.taskApp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/{userId}")
    public Task saveTask(@PathVariable Long userId, @RequestBody Task task) {
        return taskService.saveTask(userId, task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUserId(@PathVariable Long userId) {
        return taskService.getTasksByUId(userId);
    }

    @GetMapping("/{userId}/{taskId}")
    public ResponseEntity<Task> getTaskByuIdANDtID(@PathVariable Long userId, @PathVariable Long taskId) {
        Task task = taskService.getTaskById(userId, taskId);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{userId}/{taskId}")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long userId, @PathVariable Long taskId) {
        boolean deleted = taskService.deleteTask(userId, taskId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}/{taskId}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long userId,
            @PathVariable Long taskId,
            @RequestBody Task task) {
        task = taskService.updateTask(userId, taskId, task);
        return ResponseEntity.ok(task);
    }
}
