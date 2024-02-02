package com.masterCodeLerner.taskApp.model;

public class Task {

    private long tId;
    private String taskTitle;
    private String taskDescription;
    private String priority;

    // Assuming a User field to represent the associated user
    private User user;

    public Task() {
    }

    public Task(long tId, String taskTitle, String taskDescription, String priority, User user) {
        this.tId = tId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.priority = priority;
        this.user = user;
    }

    public long getTId() {
        return tId;
    }

    public void setTId(long tId) {
        this.tId = tId;
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
    public Long getUser() {
        return (user != null) ? user.getId() : null;
    }

    public void setUser(User user) {

        this.user = user;
    }
}
