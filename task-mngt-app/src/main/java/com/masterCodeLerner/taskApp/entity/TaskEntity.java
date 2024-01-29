package com.masterCodeLerner.taskApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "task")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_id")
    private Long TId;

    private String taskTitle;
    private String taskDescription;
    private String priority;

    @ManyToOne
    @JoinColumn(name = "uId")  // This is the foreign key column in the tasks table
    @JsonBackReference
    private UserEntity user;

    public TaskEntity(long tId, String taskTitle, String taskDescription, String priority, UserEntity uId) {
        this.TId = tId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.priority = priority;
        this.user = uId;
    }

    public TaskEntity() {
    }



    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Long getTId() {
        return TId;
    }

    public void setTId(Long TId) {
        this.TId = TId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}