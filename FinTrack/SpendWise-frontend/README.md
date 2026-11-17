# SpendWise updated frontend

React + Vite frontend for the Personal Expense Tracker. This version adds:
- Public landing page and login / signup screens
- Dark left sidebar navigation inspired by the supplied reference
- Dashboard charts and financial summary
- Daily and monthly expenses
- Transaction list with search, edit and delete
- High-alert expense review (simple amount threshold)
- High-value payment review (₹10,000+ rule; not fraud detection)
- Recurring-pattern view based on matching expense titles across months
- Printable monthly report (use Download / Print PDF, then choose Save as PDF)
- Responsive mobile layout

## Install and run

Use Node.js 20+ (Node 22 is fine). In this folder:

```bash
npm install
npm run dev
```

Open http://localhost:5173.

The dependency versions are pinned compatibly: Vite 6.4.6 with @vitejs/plugin-react 4.7.0. This avoids the previous ERESOLVE issue caused by installing plugin-react `latest` (version 6 requires Vite 8).

## Backend API expected

The frontend expects the existing expense API:
- GET `/api/expenses`
- POST `/api/expenses`
- PUT `/api/expenses/{id}`
- DELETE `/api/expenses/{id}`

It also expects authentication endpoints:
- POST `/api/auth/login` with `{ "email": "...", "password": "..." }`
- POST `/api/auth/signup` with `{ "fullName": "...", "email": "...", "password": "..." }`

Expected successful response from either auth endpoint:

```json
{
  "token": "JWT_OR_SESSION_TOKEN",
  "user": {
    "id": 1,
    "fullName": "Aadesh Khamkar",
    "email": "aadeshbkhamkar@gmail.com"
  }
}
```

The token is attached as `Authorization: Bearer <token>` to subsequent API requests. If the current Spring Boot project does not yet implement `/api/auth/login` and `/api/auth/signup`, the sign-in / sign-up UI will show a backend connection message until those endpoints are added. A frontend-only change cannot securely write user credentials into MySQL.

## User table SQL

Run `sql/users.sql` in MySQL Workbench. It creates `app_users` and inserts the initial account:
- Email: `aadeshbkhamkar@gmail.com`
- Password: `aadesh123`

The password is stored as a BCrypt hash. Configure Spring Security's `BCryptPasswordEncoder` to verify it. The signup endpoint should hash each new password with the same encoder before inserting the user. Do not store or return plain-text passwords.

## Notes

- The alert and risk screens use transparent, simple rules based on transaction amounts. They are review aids, not bank fraud detection.
- The recurring screen detects similar expense titles appearing in multiple months. It does not create automatic payments or future records.
- The PDF action uses the browser print dialog. Select “Save as PDF”.
