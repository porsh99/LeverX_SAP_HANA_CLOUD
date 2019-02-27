package com.leverx.leverxspringdemo.domain;

import java.util.List;

public class Person {
	
	private long id;
	
	private String name;
	
	private String surname;
	
	private int age;

	public List<Car> carList;


	public void setCars(List<Car> carList) {
		this.carList = carList;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

}
