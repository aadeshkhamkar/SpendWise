-- Personal Expense Tracker database
CREATE DATABASE IF NOT EXISTS expense_tracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE expense_tracker;

-- Spring Boot / Hibernate creates and updates this table automatically
-- because spring.jpa.hibernate.ddl-auto=update is configured.
-- This CREATE TABLE is included for reference/manual setup.
CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(500),
    PRIMARY KEY (id)
);
