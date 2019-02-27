package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.ICarDao;
import com.leverx.leverxspringdemo.domain.Car;

@Repository
public class CarDao implements ICarDao{

    private static final Logger logger = LoggerFactory.getLogger(CarDao.class);

    @Autowired
    private DataSource dataSource;

    @Override
    public Optional<Car> getById(Long id) {
        Optional<Car> entity = null;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmnt = conn.prepareStatement(
                     "SELECT TOP 1 \"id\", \"name\", \"pId\" FROM \"JAVAHWSCP::Car\" WHERE \"id\" = ?")) {
            stmnt.setLong(1, id);
            ResultSet result = stmnt.executeQuery();
            if (result.next()) {
                Car car = new Car();
                car.setId(id);
                car.setName(result.getString("name"));
                car.setPid(result.getLong("PID"));
                entity = Optional.of(car);
            } else {
                entity = Optional.empty();
            }
        } catch (SQLException e) {
            logger.error("Error while trying to get entity by Id: " + e.getMessage());
        }
        return entity;
    }

    @Override
    public List<Car> getAll() {
        List<Car> personList = new ArrayList<Car>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmnt = conn
                     .prepareStatement("SELECT \"id\", \"name\", \"pId\" FROM \"JAVAHWSCP::Car\"")) {
            ResultSet result = stmnt.executeQuery();
            while (result.next()) {
                Car car = new Car();
                car.setId(result.getLong("ID"));
                car.setName(result.getString("NAME"));
                car.setPid(result.getLong("PID"));
                personList.add(car);
            }
        } catch (SQLException e) {
            logger.error("Error while trying to get list of entities: " + e.getMessage());
        }
        return personList;
    }

    @Override
    public void save(Car entity) {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmnt = conn.prepareStatement(
                     "INSERT INTO \"JAVAHWSCP::Car\"(\"name\",\"pId\") VALUES (?,?)")) {
            stmnt.setString(1, entity.getName());
            stmnt.execute();
        } catch (SQLException e) {
            logger.error("Error while trying to add entity: " + e.getMessage());
        }
    }

    @Override
    public void delete(Long id) {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"JAVAHWSCP::Car\" WHERE \"id\" = ?")) {
            stmnt.setLong(1, id);
            stmnt.execute();
        } catch (SQLException e) {
            logger.error("Error while trying to delete entity: " + e.getMessage());
        }
    }

    @Override
    public void update(Car entity) {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmnt = conn.prepareStatement(
                     "UPDATE \"JAVAHWSCP::Car\" SET \"name\" = ? WHERE \"id\" = ?")) {
            stmnt.setString(1, entity.getName());
            stmnt.setLong(4, entity.getId());
            stmnt.executeUpdate();
        } catch (SQLException e) {
            logger.error("Error while trying to update entity: " + e.getMessage());
        }
    }
}
