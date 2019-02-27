package com.leverx.leverxspringdemo.domain;

public class Car {
    private long id;
    private String name;
    private long pId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPid() {
        return pId;
    }

    public void setPid(long id) {
        this.pId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
