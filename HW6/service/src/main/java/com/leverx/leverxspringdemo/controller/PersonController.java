package com.leverx.leverxspringdemo.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Person;
import com.leverx.leverxspringdemo.service.PersonService;

@RestController
public class PersonController {
	
	@Autowired
	private PersonService personService;
	
	@GetMapping(value="/person")
	public List<Person> getAllPerson() {
		return personService.getPersonAll();
	}


	@GetMapping(value="/personCars/{id}")
	public Person getPersonCars(@PathVariable Long id) throws SQLException {
		return personService.getPersonCars(id);
	}

	@GetMapping(value="/personCars2/{id}")
	public List<String>  getPersonCars2(@PathVariable Long id) throws SQLException {
		return personService.getPersonCars2(id);
	}

	@GetMapping(value="/person/{id}")
	public Person getPerson(@PathVariable Long id) {
		return personService.getPerson(id);
	}
	
	@PostMapping(value="/person")
	public void createPerson(@RequestBody Person person) {
		personService.createPerson(person);
	}
	
	@DeleteMapping(value="/person/{id}")
	public void deletePerson(@PathVariable Long id) {
		personService.deletePerson(id);
	}
	
	@PutMapping(value="/person")
	public void updatePerson(@RequestBody Person person) {
		personService.updatePerson(person);
	}
	
}
