-- Run this in MySQL Workbench after selecting your existing expense_tracker database.
USE expense_tracker;

-- Secure user table. Passwords are BCrypt hashes, never plain text.
CREATE TABLE IF NOT EXISTS app_users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Initial account requested for the project owner.
-- Login email: aadeshbkhamkar@gmail.com
-- Password: aadesh123
-- Hash was generated using BCrypt (cost 10).
INSERT INTO app_users (full_name, email, password_hash, role)
VALUES (
    'Aadesh Khamkar',
    'aadeshbkhamkar@gmail.com',
    '$2y$10$h.g7s4Ak3Aure8o5EQv.tOGJRCdU5HXidfRfENvn0XDMKzGDYSpxS',
    'ADMIN'
)
ON DUPLICATE KEY UPDATE
    full_name = VALUES(full_name),
    password_hash = VALUES(password_hash),
    role = VALUES(role);

-- Verify that the account exists (does not display the password hash).
SELECT id, full_name, email, role, created_at
FROM app_users;

-- Additional users should be created from the app's Sign up page.
-- Do not insert plain-text passwords into this table.
