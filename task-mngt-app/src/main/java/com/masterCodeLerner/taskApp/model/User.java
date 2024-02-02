package com.masterCodeLerner.taskApp.model;

public class User {

    private long id;
    private String emailId;
    private String name;
    private String password;
    private String role;

    // Constructors, getters, and setters...

    public User(long id, String emailId, String name, String password, String role) {
        this.id = id;
        this.emailId = emailId;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

    public String getRole() {

        return role;
    }

    public void setRole(String role) {

        this.role = role;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public String getEmailId() {

        return emailId;
    }

    public void setEmailId(String emailId) {

        this.emailId = emailId;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public long getId() {

        return id;
    }

    public void setId(long id) {

        this.id = id;
    }
}
