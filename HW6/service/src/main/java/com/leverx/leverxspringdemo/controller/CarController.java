package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Car;
import com.leverx.leverxspringdemo.service.CarService;

@RestController
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping(value="/car")
    public List<Car> getAllCar() {
        return carService.getCarAll();
    }

    @GetMapping(value="/car/{id}")
    public Car getCar(@PathVariable Long id) {
        return carService.getCar(id);
    }

    @PostMapping(value="/car")
    public void createCar(@RequestBody Car car) {
        carService.createCar(car);
    }

    @DeleteMapping(value="/car/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }

    @PutMapping(value="/car")
    public void updateCar(@RequestBody Car car) {
        carService.updateCar(car);
    }

}
