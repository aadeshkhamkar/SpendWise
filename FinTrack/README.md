# Personal Expense Tracker

A full-stack expense tracker using React (Vite), Java 21 / Spring Boot, and MySQL.

## Project structure

- `backend/` — Spring Boot REST API (import into Eclipse as an Existing Maven Project)
- `frontend/` — React + Vite application (open in VS Code)
- `sqldb/` — MySQL database creation and optional sample data

## Requirements

- Java 21
- Maven (or Eclipse's embedded Maven support)
- Node.js 20+ and npm
- MySQL 8+
- VS Code and Eclipse IDE (or equivalent editors)

## 1. Create the database

Run `sqldb/schema.sql` in MySQL Workbench.

The backend expects:
- Database: `expense_tracker`
- Username: `root`
- Password: set in `backend/src/main/resources/application.properties`

Update the password before running. Do not commit real database credentials to a public repository.

## 2. Run the backend in Eclipse

1. Open Eclipse.
2. Select **File → Import → Maven → Existing Maven Projects**.
3. Select the `backend` folder.
4. Finish the import and wait for Maven dependencies to download.
5. Open `src/main/resources/application.properties` and set your MySQL password.
6. Run `ExpenseTrackerApplication.java` as **Spring Boot App**.

Backend URL: `http://localhost:8080`

Test endpoint: `GET http://localhost:8080/api/expenses`

## 3. Run the frontend in VS Code

Open the `frontend` folder in VS Code, then run:

```bash
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/expenses` | List transactions |
| GET | `/api/expenses/{id}` | Get one transaction |
| POST | `/api/expenses` | Create transaction |
| PUT | `/api/expenses/{id}` | Update transaction |
| DELETE | `/api/expenses/{id}` | Delete transaction |

A transaction `type` must be `INCOME` or `EXPENSE`.

Example request:

```json
{
  "title": "Monthly Salary",
  "amount": 25000,
  "category": "Salary",
  "type": "INCOME",
  "date": "2026-11-17",
  "description": "November salary"
}
```

## Notes

- The backend enables CORS for `http://localhost:5173`.
- Hibernate uses `ddl-auto=update` so it creates/updates the `expenses` table automatically.
- The frontend uses Axios to call the backend.
- This starter project is intended for local development and internship demonstration. Authentication and production deployment are not included.
