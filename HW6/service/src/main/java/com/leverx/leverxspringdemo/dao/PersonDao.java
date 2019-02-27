package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import com.leverx.leverxspringdemo.domain.Car;
import org.apache.commons.lang3.exception.ExceptionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IPersonDao;
import com.leverx.leverxspringdemo.domain.Person;
import rx.exceptions.Exceptions;

@Repository
public class PersonDao implements IPersonDao {

	private static final Logger logger = LoggerFactory.getLogger(PersonDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Person> getById(Long id) {
		Optional<Person> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"id\", \"name\", \"surname\", \"age\" FROM \"JAVAHWSCP::Person\" WHERE \"id\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Person person = new Person();
				person.setId(id);
				person.setName(result.getString("name"));
				person.setSurname(result.getString("surname"));
				person.setAge(result.getInt("age"));
				entity = Optional.of(person);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	public Person getCars(Long id) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement stmnt = conn.prepareStatement("SELECT TOP 1 \"id\", \"name\", \"surname\", \"age\" FROM \"JAVAHWSCP::Person\" WHERE \"id\" = ?");
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			Person person = new Person();
			if (result.next()) {
				person.setId(id);
				person.setName(result.getString("name"));
				person.setSurname(result.getString("surname"));
				person.setAge(result.getInt("age"));
			}

		List<Car> carList = new ArrayList<Car>();

			PreparedStatement stmnt2 = conn.prepareStatement("SELECT \"id\", \"name\", \"pId\" FROM \"JAVAHWSCP::Car\" WHERE \"pId\" = ? ");
			stmnt2.setLong(1, id);
			ResultSet result2 = stmnt2.executeQuery();
			while (result2.next()) {
				Car car = new Car();
				car.setId(result2.getLong("ID"));
				car.setName(result2.getString("NAME"));
				car.setPid(result2.getLong("PID"));
				carList.add(car);
			}
			person.carList = carList;
			conn.close();
		return person;
	}

	public List<String>  getCars2(Long id) throws SQLException {

		Connection conn = dataSource.getConnection();
		List<String> list = new ArrayList<String>();

		PreparedStatement stmnt3 = conn.prepareStatement("SELECT * FROM \"JAVAHWSCP::Person\" INNER JOIN \"JAVAHWSCP::Car\" ON \"JAVAHWSCP::Person\".\"id\" = \"JAVAHWSCP::Car\".\"pId\" WHERE \"JAVAHWSCP::Person\".\"id\" = ?");
		stmnt3.setLong(1, id);
		ResultSet result3 = stmnt3.executeQuery();
		while (result3.next()) {
			list.add(result3.getString("surname"));
			list.add(result3.getString("pId"));
			list.add("|");
		}
		conn.close();

		return list;
	}

	@Override
	public List<Person> getAll() {
		List<Person> personList = new ArrayList<Person>();
			try (Connection conn = dataSource.getConnection();
				 PreparedStatement stmnt = conn
						 .prepareStatement("SELECT \"id\", \"name\", \"surname\", \"age\" FROM \"JAVAHWSCP::Person\"")) {
				ResultSet result = stmnt.executeQuery();
				while (result.next()) {
					Person person = new Person();
					person.setId(result.getLong("ID"));
					person.setName(result.getString("NAME"));
					person.setSurname(result.getString("SURNAME"));
					person.setAge(result.getInt("AGE"));
					personList.add(person);
				}
			} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return personList;
	}

	@Override
	public void save(Person entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"JAVAHWSCP::Person\"(\"name\", \"surname\", \"age\") VALUES (?, ?, ?)")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getSurname());
			stmnt.setInt(3, entity.getAge());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"JAVAHWSCP::Person\" WHERE \"id\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Person entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"JAVAHWSCP::Person\" SET \"name\" = ?, \"surname\" = ?, \"age\" = ? WHERE \"id\" = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getSurname());
			stmnt.setInt(3, entity.getAge());
			stmnt.setLong(4, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
