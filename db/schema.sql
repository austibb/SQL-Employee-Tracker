DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

--- Department filler ---
INSERT INTO department (name)
VALUE ("Sales"), ("Engineering"), ("Finance"), ("Legal");

-- - Role filler ---
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 95000, 1), ('Sales Analyst', 80000, 1), ('Design Lead', 115000, 2), ('UI/UX Designer', 85000, 2), ('Software Engineer', 125000, 2), ('Accountant', 80000, 3), ('Legal Representative', 100000, 4);

--- Employee filler ---
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jonas', 'Franck', 1, null), ('Eshan', 'Mcmanus', 2, 1), ('Priyanka', 'Garg', 3, null), ('David', 'Shen', 4, 3);