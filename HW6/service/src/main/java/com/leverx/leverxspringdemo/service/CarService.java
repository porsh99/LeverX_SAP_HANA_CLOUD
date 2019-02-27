package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.CarDao;
import com.leverx.leverxspringdemo.domain.Car;

@Service
public class CarService {

    @Autowired
    private CarDao carDao;

    public List<Car> getCarAll() {
        return carDao.getAll();
    }

    public Car getCar(Long id) {
        Optional<Car> carOptional = this.carDao.getById(id);
        Car car = null;
        if (carOptional.isPresent()) {
            car = carOptional.get();
        }
        return car;
    }

    public void createCar(Car car) {
        this.carDao.save(car);
    }

    public void updateCar(Car car) {
        this.carDao.update(car);
    }

    public void deleteCar(Long id) {
        this.carDao.delete(id);
    }

}
