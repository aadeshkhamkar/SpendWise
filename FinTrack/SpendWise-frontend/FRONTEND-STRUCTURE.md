# SpendWise Frontend

This frontend refresh focuses on the React UI and keeps the existing Spring Boot API contract intact.

## Structure

```text
src/
├── components/
│   └── Shared.jsx          # Reusable UI components and formatting/analytics helpers
├── pages/
│   ├── LandingPage.jsx
│   ├── AuthPage.jsx
│   ├── Dashboard.jsx
│   ├── AddExpense.jsx
│   ├── DailyExpenses.jsx
│   ├── MonthlyExpenses.jsx
│   ├── Transactions.jsx
│   ├── Analytics.jsx
│   ├── HighAlerts.jsx
│   ├── HighRiskPayments.jsx
│   ├── RecurringPayments.jsx
│   ├── Reports.jsx
│   └── Settings.jsx
├── services/
│   └── api.js               # Existing Axios / Spring Boot API calls
├── App.jsx                  # App shell, navigation, routes and application state
├── App.css                  # Global styles and responsive UI theme
└── main.jsx
```

## Run locally

1. Start the existing Spring Boot backend on `http://localhost:8080`.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:5173`.

## API integration preserved

The existing Axios service still uses these endpoints:

- `GET /api/expenses`
- `POST /api/expenses`
- `PUT /api/expenses/{id}`
- `DELETE /api/expenses/{id}`
- `POST /api/auth/login`
- `POST /api/auth/signup`

No backend source, SQL schema, or database records were modified as part of this UI refresh.

## Dependency compatibility

The Vite setup remains on Vite 6 with `@vitejs/plugin-react` 4.7.0. Avoid changing the plugin to `latest`, because the latest plugin major may require a newer Vite major.
