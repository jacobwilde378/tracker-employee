DROP DATABASE IF EXISTS tracker_employee_db;

CREATE DATABASE tracker_employee_db;

USE tracker_employee_db;

CREATE TABLE department (
    id INTEGER(12) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER(12) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    department_id INTEGER(12) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER(12) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(12) NOT NULL,
    manager_id INTEGER(12) NULL,
    PRIMARY KEY(id)
);