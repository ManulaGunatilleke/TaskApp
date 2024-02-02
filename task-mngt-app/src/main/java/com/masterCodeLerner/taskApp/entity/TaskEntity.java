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

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "u_id")
    @JsonBackReference
    private UserEntity UId;

    public TaskEntity(long tId, String taskTitle, String taskDescription, String priority, UserEntity user) {
        this.TId = tId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.priority = priority;
        this.UId = user;
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

    public UserEntity getUId() {
        return (UId != null) ? UId : null;
    }

    public void setUser(UserEntity user) {

        this.UId = user;
    }
}