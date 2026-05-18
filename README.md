# Edventures — College Management Portal

**Edventures** is a full-stack web application for managing day-to-day academic operations in schools and colleges. It gives institutes a single place to onboard users, control access by role, and support teaching and learning workflows—from attendance and assignments to exams, events, and announcements.

The platform is built for institutes that want clearer communication between **admins**, **teachers**, **students**, and **parents**, with dashboards tailored to each role.

---

## Project objectives

- Centralize institute registration and multi-role authentication (Admin, Teacher, Student).
- Provide role-specific dashboards for academic and administrative tasks.
- Support institute-scoped access so each organization manages its own users.
- Offer modules for students, teachers, classes, subjects, attendance, exams, results, and messaging (UI-ready; data layers expandable).
- Improve onboarding and daily operations with a modern, responsive interface.

---

## Tech stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI |
| **Vite** | Dev server and production builds |
| **React Router** | Client-side navigation |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Charts and analytics on dashboards |
| **React Big Calendar** | Events and scheduling |
| **Axios / Fetch** | API calls to the backend |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js & Express** | REST API server |
| **MySQL** (via **XAMPP**) | Relational database for users and academic data |
| **mysql2** | MySQL driver for Node.js |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment configuration |
| **CORS & body-parser** | Cross-origin and JSON request handling |

> **Note:** XAMPP ships with **MySQL/MariaDB**, not Microsoft SQL Server. All scripts in `backend/sql/` use MySQL syntax and run in **phpMyAdmin** or the MySQL CLI from XAMPP.

---

## Key features

- **Role-based access control** — Admins register institutes; teachers and students sign up and log in with role-specific dashboards.
- **Institute management** — Each admin is tied to a unique institute name; users select their institute during onboarding.
- **Secure authentication** — Passwords stored with bcrypt; login via `/api/auth/verify` and admin routes under `/api/admin`.
- **Admin dashboard** — Overview charts, user counts, and quick links to management lists.
- **Teacher & student dashboards** — Schedules, assignments, exams, results, and profile areas.
- **Academic modules (UI)** — Subjects, classes, lessons, attendance, exams, results, announcements, events, messages, and parent views.
- **Theme support** — Light/dark theme toggle for comfortable use.

---

## Sample use cases

| Role | Example |
|------|---------|
| **Admin** | Register a new institute, manage teachers and students, publish announcements. |
| **Teacher** | View class schedule, track attendance, upload assignments and exam schedules. |
| **Student** | Check timetable, submit assignments, view results and announcements. |
| **Parent** | Monitor child attendance and academic progress (parent dashboard). |

---

## Project structure

```
edventures/
├── backend/
│   ├── controllers/       # Admin auth logic
│   ├── models/            # MySQL connection (adminModel)
│   ├── routes/            # /api/admin, /api/auth
│   ├── sql/               # Database schema & sample queries
│   │   ├── schema.sql
│   │   ├── sample_queries.sql
│   │   └── add_institute_column.sql
│   ├── server.js          # Express entry point
│   ├── package.json
│   └── .env               # DB credentials (not committed)
├── frontend/
│   ├── src/
│   │   ├── components/    # Charts, tables, forms, calendar
│   │   ├── pages/         # Home, Login, dashboards, list pages
│   │   ├── layouts/       # DashboardLayout
│   │   ├── lib/           # Auth helpers, mock data
│   │   └── App.jsx        # Routes
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── package.json           # Root scripts (dev, build)
└── README.md
```

---

## Database setup (XAMPP + MySQL)

### 1. Start MySQL in XAMPP

1. Open **XAMPP Control Panel**.
2. Start **Apache** (optional, for phpMyAdmin) and **MySQL**.

### 2. Create the database

**Option A — phpMyAdmin**

1. Go to `http://localhost/phpmyadmin`.
2. Open the **SQL** tab.
3. Paste and run the contents of [`backend/sql/schema.sql`](backend/sql/schema.sql).

**Option B — MySQL command line**

```bash
mysql -u root -p < backend/sql/schema.sql
```

(Default XAMPP user is `root` with an empty password unless you changed it.)

### 3. Configure the backend

Copy the example env file and edit credentials:

```bash
cp backend/.env.example backend/.env
```

Example `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=edventures
DB_PORT=3306
PORT=5000
```

### 4. Sample queries

See [`backend/sql/sample_queries.sql`](backend/sql/sample_queries.sql) for common **SELECT**, **INSERT**, and **UPDATE** examples (users, institutes, attendance, exams).

### Core tables

| Table | Description |
|-------|-------------|
| `admins` | Institute administrators (`adminID`, `instituteName`, `adminName`, `email`, `password`) |
| `teachers` | Teacher accounts (`teacherId`, `name`, `email`, `password`, `instituteName`) |
| `students` | Student accounts (`studentId`, `name`, `email`, `password`, `instituteName`) |
| `parents` | Parent accounts (optional, for parent portal) |
| `subjects`, `classes`, `attendance`, `exams`, `results`, `announcements`, `events` | Academic data (schema included for extension) |

---

## Installation & run locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [XAMPP](https://www.apachefriends.org/) with MySQL running
- Database created from `backend/sql/schema.sql`

### Install dependencies

From the project root:

```bash
npm install --prefix frontend
npm install --prefix backend
```

### Run the application

**Terminal 1 — Backend (port 5000):**

```bash
npm run dev:backend
```

**Terminal 2 — Frontend (port 5173):**

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

The Vite dev server proxies `/api` requests to the backend when configured in `vite.config.js`; ensure the backend is running on port `5000`.

### Production build (frontend only)

```bash
npm run build
npm run preview
```

---

## API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/register` | Register a new institute admin |
| `POST` | `/api/admin/login` | Admin login (email + password) |
| `GET` | `/api/admin/institutes` | List registered institute names |
| `POST` | `/api/auth/verify` | Login for Student / Teacher / Admin (ID + password + role) |
| `POST` | `/api/auth/detail/register` | Complete student or teacher profile registration |

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host (usually `localhost`) |
| `DB_USER` | MySQL user (XAMPP default: `root`) |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name (`edventures`) |
| `DB_PORT` | MySQL port (`3306`) |
| `PORT` | Express server port (`5000`) |

Never commit `.env` files. Use `backend/.env.example` as a template.

### Demo accounts (after running `schema.sql`)

| Role | ID | Password |
|------|-----|----------|
| Admin | `ADM001` | `password123` |
| Teacher | `TCH001` | `password123` |
| Student | `STU001` | `password123` |

Institute: **Demo Institute**

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes and open a pull request.

---

## License

This project is for educational and institute use. Adjust licensing as needed for your organization.

---

## Repository

GitHub: [College-Management-Portal](https://github.com/shiva2k03/College-Management-Portal)
