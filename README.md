# Apex Software Engineering (Pvt) Ltd - Corporate Web Application

A production-ready, full-stack corporate web application, RESTful API, and administration portal built for **Apex Software Engineering (Pvt) Ltd**, an end-to-end software engineering and digital transformation partner in Colombo, Sri Lanka.

---

## 🏛️ Technology Stack & Architecture

### Frontend (`frontend/`)
- **Framework**: Angular 18+ (Standalone Component Architecture, Angular Signals, RxJS, Angular Router)
- **Rendering & SEO**: Angular Server-Side Rendering (SSR), Schema.org JSON-LD Structured Data, Dynamic Open Graph & Twitter Cards
- **Styling & Design System**: Custom SCSS (Deep Navy `#0b192c`, Electric Blue/Teal accent `#00b4d8`, Warm Off-White `#f8fafc`, WCAG 2.1 AA compliant typography & focus states)
- **Forms & State**: Reactive Forms with validation, Honeypot anti-spam protection, Cookie Consent Banner (GDPR compliant)

### Backend (`backend/`)
- **Framework**: Node.js & NestJS REST API with TypeScript
- **ORM & Database**: Prisma ORM with MySQL 8 (15 normalized relational tables)
- **Authentication & Security**: JWT Access Token (15m) + Refresh Token Rotation (7d) stored in DB, Argon2/bcrypt hashing, Helmet security headers, Throttler rate limiting, CORS configuration, Role-based guards (`ADMIN`, `SUPERADMIN`)
- **API Documentation**: Swagger / OpenAPI live documentation interactive explorer at `/api/docs`
- **Logging & Errors**: Correlation Request ID tracking, structured logging, centralized `HttpExceptionFilter`

### Infrastructure
- **Containerization**: Multi-stage `Dockerfile` for frontend and backend, `docker-compose.yml` with MySQL 8 health checks and persistent volume storage.

---

## 📂 Repository Structure

```
company-website/
├── frontend/                     # Angular 18+ Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/            # Guards, Interceptors, Services (API, Auth, SEO, Cookie)
│   │   │   ├── shared/          # Header, Footer, Cookie Banner
│   │   │   ├── features/        # Home, About, Services, Industries, Solutions,
│   │   │   │                    # Delivery, Portfolio, Insights, Contact, Legal, Admin
│   │   │   ├── app.routes.ts    # Lazy-loaded routes
│   │   │   └── app.config.ts    # Standalone providers
│   │   ├── styles.scss          # SCSS Design System & CSS Variables
│   │   ├── index.html           # Meta tags & Web Vitals setup
│   │   ├── main.ts              # Browser Entrypoint
│   │   └── server.ts            # Express Node SSR Server
│   ├── angular.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── package.json
├── backend/                      # NestJS REST API
│   ├── prisma/
│   │   ├── schema.prisma        # 15 Entities MySQL Schema
│   │   └── seed.ts              # Seeder with Sri Lankan IT services data
│   ├── src/
│   │   ├── common/              # Exception Filters, Guards, Decorators
│   │   ├── modules/             # Auth, Services, Industries, Portfolio,
│   │   │                        # Blog, Enquiries, Team, Settings, AuditLogs
│   │   ├── app.module.ts
│   │   └── main.ts              # Swagger, Helmet, ValidationPipe setup
│   ├── test/                    # Unit & Integration test suites
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml            # Container Orchestration
├── .env.example                  # Environment Variables Template
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher
- MySQL 8.0 instance (or Docker)

---

### Option 1: Docker Setup (Recommended)

1. Clone the repository and copy `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Launch the entire application stack:
   ```bash
   docker compose up --build -d
   ```
3. Run database migrations & seed scripts inside the container:
   ```bash
   docker compose exec backend npx prisma migrate deploy
   docker compose exec backend npm run prisma:seed
   ```
4. Access the applications:
   - **Public Website (SSR)**: `http://localhost:4000`
   - **REST API Health Check**: `http://localhost:3000/api/v1/health`
   - **Swagger API Docs**: `http://localhost:3000/api/docs`
   - **Admin Portal**: `http://localhost:4000/admin/login`

---

### Option 2: Local Non-Docker Setup

#### 1. Setup Backend:
```bash
cd backend
npm install
cp .env.example .env

# Generate Prisma Client & Run Migrations
npx prisma generate
npx prisma migrate dev --name init

# Seed Database Data
npm run prisma:seed

# Run Unit Tests
npm run test

# Start Development Server
npm run start:dev
```
The REST API will be running on `http://localhost:3000`.

#### 2. Setup Frontend:
```bash
cd ../frontend
npm install

# Run Unit Tests
npm run test

# Start Development Server
npm run start
```
The Frontend will be running on `http://localhost:4200`.

---

## 🔑 Default Admin Account

During database seeding (`seed.ts`), a superadmin user is automatically created:
- **Email**: `admin@apexsoftware.lk`
- **Password**: `AdminPass123!`

> [!IMPORTANT]
> Change the default password immediately prior to production deployment by updating the `ADMIN_PASSWORD` variable in `.env` and re-running the seeder or updating the database hash.

---

## ⚙️ Testing & Build Commands

### Backend Tests & Verification
```bash
cd backend
npm run lint          # Run ESLint validation
npm run test          # Run Jest unit test suite
npm run build         # Verify production TypeScript build
```

### Frontend Tests & Verification
```bash
cd frontend
npm run test          # Run Karma/Jasmine frontend unit test suite
npm run build         # Build production Angular SSR bundle
```

---

## 🛡️ Security & Production Checklist

1. **Environment Secrets**: Update `JWT_SECRET`, `JWT_REFRESH_SECRET`, and `MYSQL_ROOT_PASSWORD` with cryptographically random strings.
2. **CORS Configuration**: Restrict `CORS_ORIGIN` in `.env` to your production domain (e.g. `https://www.apexsoftware.lk`).
3. **Database Backups**: Schedule daily automated `mysqldump` backups of `apex_company_db` to offsite storage.
4. **HTTPS Enforcement**: Deploy behind an Nginx or Cloudflare reverse proxy with TLS 1.3 enabled.

---

## 📝 Replacing Demonstration Content & Future Localization

### Demonstration Content
All case studies in `seed.ts` are clearly tagged as `Demonstration Case Study`. Administrators can log into `/admin/dashboard` to create genuine portfolio items or update services without modifying source code.

### Sinhala & Tamil Localization Roadmap
The frontend uses centralized content interfaces. To add Sinhala (si) and Tamil (ta) translations:
1. Enable `@angular/localize` in `angular.json`.
2. Extract i18n translation source files via `ng extract-i18n`.
3. Add `src/locale/messages.si.xlf` and `src/locale/messages.ta.xlf`.
