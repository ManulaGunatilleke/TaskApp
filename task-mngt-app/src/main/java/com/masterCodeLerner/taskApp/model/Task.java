package com.masterCodeLerner.taskApp.model;

public class Task {

    private long id;
    private String taskTitle;
    private String taskDescription;
    private String priority;

    // Assuming a User field to represent the associated user
    private User user;

    public Task() {
    }

    public Task(long id, String taskTitle, String taskDescription, String priority, User user) {
        this.id = id;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.priority = priority;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    // Getter and setter for User
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
