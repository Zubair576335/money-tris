<div align="center">

  <!-- Place your project logo below -->
  <img src="frontend/public/assets/finance-tracker-logo.png" alt="Finance Tracker Logo" width="auto" height="160" />
  <h1>Finance Tracker</h1>

  <p>
    Your Complete Personal Finance Management Solution
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/Zubair576335/money-tris/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/Zubair576335/money-tris" alt="contributors" />
  </a>
  <a href="https://github.com/Zubair576335/money-tris/commits/master">
    <img src="https://img.shields.io/github/last-commit/Zubair576335/money-tris" alt="last update" />
  </a>
  <a href="https://github.com/Zubair576335/money-tris/network/members">
    <img src="https://img.shields.io/github/forks/Zubair576335/money-tris" alt="forks" />
  </a>
  <a href="https://github.com/Zubair576335/money-tris/stargazers">
    <img src="https://img.shields.io/github/stars/Zubair576335/money-tris" alt="stars" />
  </a>
  <a href="https://github.com/Zubair576335/money-tris/issues/">
    <img src="https://img.shields.io/github/issues/Zubair576335/money-tris" alt="open issues" />
  </a>
  <a href="https://github.com/Zubair576335/money-tris/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/github/license/Zubair576335/money-tris" alt="license" />
  </a>
</p>

<h4>
    <a href="#demo">View Demo</a>
  <span> · </span>
    <a href="#documentation">Documentation</a>
  <span> · </span>
    <a href="https://github.com/Zubair576335/money-tris/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/Zubair576335/money-tris/issues/">Request Feature</a>
  </h4>
</div>

<br />

<div align="center">
  <!-- Place your main screenshot below -->
  <img src="frontend/public/assets/finance-tracker-screenshot.png" alt="Finance Tracker Screenshot" width="90%" />
</div>

---

## Introduction

Finance Tracker is a full-stack web application for managing personal finances, tracking expenses, setting budgets, and generating insightful reports. Built with React (frontend) and Spring Boot (backend), it offers a modern, responsive UI and robust backend APIs for secure, multi-user financial management.

---

## Modules

1. **User Authentication & Security**
   - Secure registration and login for users.
   - Session management and user data isolation.
   - Spring Security configuration for API protection.

2. **Expense Tracking**
   - Add, edit, delete, and list expenses.
   - Categorize expenses and assign dates.
   - View all expenses for a user, filter by category/date.

3. **Budget Management**
   - Set monthly budgets per category.
   - View all budgets, update or delete as needed.
   - Real-time budget vs. spent tracking.

4. **Category Management**
   - Create, edit, and delete custom categories.
   - Categories are user-specific for personalized tracking.

5. **Dashboard & Analytics**
   - Visual summary of total expenses, categories, and recent activity.
   - Pie charts and progress bars for budget vs. spent.
   - Quick access to add expenses or view lists.

6. **Reports & Data Export**
   - Generate downloadable CSV reports of expenses.
   - Trigger weekly report generation (manual or scheduled).
   - View and download historical reports.

7. **Budget Alert System (Scheduled Job)**
   - Daily cron job checks if user spending exceeds budgets.
   - Sends email alerts to users who exceed their budgets.
   - Job run history is logged and viewable.

8. **Job Control & Monitoring**
   - Trigger backend jobs (e.g., budget check) manually.
   - View history of all job runs and their statuses.

9. **Error Handling & Exception Management**
   - Global exception handler for consistent API error responses.
   - User-friendly error messages for all major operations.

10. **Dockerized Deployment**
    - Dockerfiles for both frontend and backend.
    - Nginx configuration for static serving and API proxying.
    - Easy multi-container deployment.

---

## Table of Contents
- [Introduction](#introduction)
- [Modules](#modules)
- [Project Structure](#project-structure)
- [Frontend (React)](#frontend-react)
- [Backend (Spring Boot)](#backend-spring-boot)
- [Database & Environment](#database--environment)
- [Testing](#testing)
- [Docker & Deployment](#docker--deployment)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

## Project Structure

```
Finance-Tracker-master/
  frontend/           # React app (UI)
    public/           # Static assets (logo, screenshots, manifest)
    src/              # Source code (components, styles, entry)
  PersonalFinanceTracker/ # Spring Boot backend
    src/main/java/    # Java source (controllers, services, models, repos)
    src/main/resources/   # Config (application.properties)
    reports/          # Generated reports
    Dockerfile        # Backend Docker config
  README.md           # This file
  SETUP_GUIDE.md      # Step-by-step setup instructions
```

---

## Frontend (React)

### Overview
- **Framework:** React 19
- **UI Libraries:** Material-UI (MUI), Bootstrap, Recharts
- **Routing:** react-router-dom
- **State Management:** React hooks, localStorage
- **API Calls:** axios, fetch

### Components

#### 1. `App.js`
- **Purpose:** Main entry, sets up routing and layout.
- **Key Logic:**
  - Renders `Navbar` on all pages.
  - Renders `Footer` only on the landing page.
  - Defines all routes (register, login, dashboard, add/edit expense, budgets, reports, job control, about us).

#### 2. `Navbar.js`
- **Purpose:** Top navigation bar, links to all main pages, handles logout.
- **Key Logic:**
  - Shows app name/logo.
  - Shows navigation links based on authentication state.
  - Handles logout by clearing localStorage and redirecting.

#### 3. `Footer.js`
- **Purpose:** Footer with project info, links, and credits.
- **Key Logic:**
  - Only shown on the landing page.
  - Contains sections for About, Quick Links, and Contact.

#### 4. `LandingPage.js`
- **Purpose:** Welcome page for new/unauthenticated users.
- **Key Logic:**
  - Shows app intro, call-to-action buttons for Register/Login.

#### 5. `Register.js` & `Login.js`
- **Purpose:** User registration and authentication forms.
- **Key Logic:**
  - Form validation.
  - API calls to backend `/api/auth/register` and `/api/auth/login`.
  - Stores userId in localStorage on login.

#### 6. `Dashboard.js`
- **Purpose:** Main user dashboard with financial summary and charts.
- **Key Logic:**
  - Fetches summary data from `/api/expenses/summary`.
  - Fetches budget vs spent data for charts.
  - Renders pie chart (Recharts) and budget progress bars.
  - Quick action buttons for adding expenses and viewing list.

#### 7. `AddExpense.js`
- **Purpose:** Add a new expense, manage categories inline.
- **Key Logic:**
  - Form for amount, category, date.
  - Fetches categories for the user.
  - Allows adding/editing/deleting categories via dialogs.
  - Submits new expense to `/api/expenses/add`.

#### 8. `ExpenseList.js`
- **Purpose:** List all expenses for the user.
- **Key Logic:**
  - Fetches expenses from `/api/expenses/user/{userId}`.
  - Allows updating (redirects to EditExpense) and deleting expenses.

#### 9. `EditExpense.js`
- **Purpose:** Edit an existing expense, manage categories.
- **Key Logic:**
  - Fetches expense details and categories.
  - Allows editing amount, category, date.
  - Allows editing/deleting categories inline.
  - Submits updates to `/api/expenses/update/{id}`.

#### 10. `BudgetManager.js`
- **Purpose:** Set and manage monthly budgets per category.
- **Key Logic:**
  - Fetches budgets and categories.
  - Allows adding/editing/deleting categories.
  - Adds new budgets for a category/month/year.
  - Displays all budgets in a table.

#### 11. `Reports.js`
- **Purpose:** View and download generated financial reports.
- **Key Logic:**
  - Fetches available reports for the user.
  - Allows downloading CSV reports.
  - Triggers new report generation.

#### 12. `JobControl.js`
- **Purpose:** Trigger and view history of scheduled jobs (e.g., budget checks).
- **Key Logic:**
  - Triggers backend job for budget alert.
  - Fetches and displays job run history.

#### 13. `AboutUs.js`
- **Purpose:** Static info about the project, mission, and vision.

#### 14. **Styles**
- Each component has its own CSS for modular styling.
- Global styles in `App.css`.

#### 15. **Assets**
- Place your logo and screenshots in `frontend/public/assets/`.

#### 16. **Environment Variables**
- API base URL set via `REACT_APP_API_URL` in `.env`.

---

## Backend (Spring Boot)

### Overview
- **Framework:** Spring Boot
- **Database:** (Configurable, e.g., H2, MySQL, PostgreSQL)
- **ORM:** Spring Data JPA
- **Security:** Spring Security (configurable)
- **Mail:** JavaMailSender (for alerts)

### Main Packages
- `Controller/` — REST API endpoints
- `Service/` — Business logic
- `Model/` — JPA entities
- `Repository/` — Data access
- `Config/` — Security, CORS, etc.

### Controllers & Endpoints

#### 1. `AuthController`
- **/api/auth/login**: User login (POST)
- **/api/auth/register**: User registration (POST)

#### 2. `ExpenseController`
- **/api/expenses/add**: Add expense (POST)
- **/api/expenses/user/{userId}**: List expenses (GET)
- **/api/expenses/{id}**: Get expense by ID (GET)
- **/api/expenses/update/{id}**: Update expense (PUT)
- **/api/expenses/delete/{id}**: Delete expense (DELETE)
- **/api/expenses/summary**: Get dashboard summary (GET)
- **/api/expenses/budget-vs-spent**: Get budget vs spent per category (GET)

#### 3. `CategoryController`
- **/api/categories?userId=**: List categories (GET)
- **/api/categories?userId=**: Add category (POST)
- **/api/categories/{id}?userId=**: Update category (PUT)
- **/api/categories/{id}?userId=**: Delete category (DELETE)

#### 4. `BudgetController`
- **/api/budgets?userId=**: List budgets (GET)
- **/api/budgets?userId=**: Add budget (POST)
- **/api/budgets/{id}**: Update budget (PUT)
- **/api/budgets/{id}**: Delete budget (DELETE)

#### 5. `ReportController`
- **/api/reports?userId=**: List reports (GET)
- **/api/reports/download/{id}**: Download report (GET)
- **/api/reports/trigger**: Trigger report generation (POST)

#### 6. `JobController`
- **/api/jobs/trigger-budget-check**: Trigger budget alert job (POST)
- **/api/jobs/history**: Get job run history (GET)

#### 7. `GlobalExceptionHandler`
- Handles and formats all uncaught exceptions as JSON responses.

### Services
- **UserService:** User CRUD, authentication helpers
- **ExpenseService:** Expense CRUD, summary, filtering
- **BudgetAlertService:** Scheduled job for budget alerts, sends emails
- **ReportService:** Generates and manages reports, scheduled weekly
- **JobService:** Triggers and logs job runs

### Models/Entities
- **User:** id, username, password, email
- **Expense:** id, amount, category, date, user
- **Category:** id, name, user
- **Budget:** id, user, category, amount, month, year
- **Report:** id, filename, generatedAt, path, user
- **JobRun:** id, jobType, status, startedAt, finishedAt, message

### Repositories
- **UserRepository:** Find by username, exists by username
- **ExpenseRepository:** Find by user, by date range
- **CategoryRepository:** Find by user
- **BudgetRepository:** Find by user, category, month, year
- **ReportRepository:** Find by user
- **JobRunRepository:** All job runs

### Configuration
- **SecurityConfig:** CORS, CSRF, endpoint security
- **WebConfig:** CORS mappings
- **application.properties:** DB, mail, JPA, etc.

---

## Database & Environment

- Configure DB connection in `PersonalFinanceTracker/src/main/resources/application.properties`.
- Example variables:
  - `spring.datasource.url=...`
  - `spring.datasource.username=...`
  - `spring.datasource.password=...`
  - `spring.jpa.hibernate.ddl-auto=update`
  - `spring.mail.host=...`
  - `spring.mail.username=...`
  - `spring.mail.password=...`
- Frontend API URL: `.env` with `REACT_APP_API_URL=http://localhost:8080`

---

## Testing

- **Frontend:**
  - Run `npm test` in `frontend/` for React component tests.
- **Backend:**
  - JUnit tests in `PersonalFinanceTracker/src/test/java/`
  - Run with `mvn test`.

---

## Docker & Deployment

- **Frontend:**
  - `frontend/Dockerfile` builds React app and serves with Nginx.
- **Backend:**
  - `PersonalFinanceTracker/Dockerfile` builds Spring Boot app.
- **Nginx:**
  - `frontend/nginx.conf` proxies API requests to backend.
- **How to run:**
  - Build both images, run containers, ensure network connectivity.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a pull request.

**Code Style:**
- Use clear, descriptive commit messages.
- Follow existing code conventions (Java for backend, JS/React for frontend).
- Add/maintain tests for new features.

---

## License & Contact

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

For any inquiries or issues, feel free to reach out to the project maintainer:

- **Developer:** [Zubair Khan](https://github.com/Zubair576335)
- **Repository:** [https://github.com/Zubair576335/money-tris](https://github.com/Zubair576335/money-tris)
- **Email:** [khan576335@gmail.com](mailto:khan576335@gmail.com)

---

<!--
To add your logo and screenshots:
- Place your logo as `frontend/public/assets/finance-tracker-logo.png`
- Place your main screenshot as `frontend/public/assets/finance-tracker-screenshot.svg`
- Update the <img src=...> tags above if you use different filenames or formats.
--> 
