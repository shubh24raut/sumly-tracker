# Sumly Tracker Backend

Personal Finance and Budgeting Tracker REST API built with Node.js, Express, MongoDB, and Mongoose.

## Project Status

Current checkpoint: **Checkpoint 2 - Core Ledger Transactions CRUD completed**

Completed so far:

- Node.js project initialized
- ES Modules enabled
- Express server foundation added
- Environment configuration added
- MVC folder structure created
- MongoDB Atlas connection configured
- Basic `/health` route available
- Secure auth flow with JWT stored in HttpOnly cookies
- Auth validation for register and login
- Protected `/api/v1/auth/me` route
- Transaction model, controller, routes, and validation
- User-scoped transaction CRUD with pagination and filtering

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- HttpOnly cookies
- bcrypt
- express-validator
- dotenv
- cors
- cookie-parser

## Architecture

This project follows a strict MVC structure.

```text
src/
  config/
    db.js
    env.js

  controllers/
    authController.js
    transactionController.js

  middlewares/
    authMiddleware.js
    authValidators.js
    transactionValidators.js
    validateRequest.js

  models/
    Transaction.js
    User.js

  routes/
    authRoutes.js
    transactionRoutes.js

  utils/
    generateToken.js

  server.js
```

### Folder Responsibilities

`src/models/`

Defines Mongoose schemas, database validation, and model-level business behavior.

`src/controllers/`

Handles request processing, coordinates models, and returns structured JSON responses.

`src/routes/`

Maps HTTP methods and endpoints to controller functions. Route files should remain declarative.

`src/middlewares/`

Contains request middleware such as authentication, validation, and centralized error handling.

`src/config/`

Contains configuration modules such as environment loading and database connection setup.

`src/utils/`

Contains reusable helper functions.

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sumly_tracker
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

An `.env.example` file is included for reference. Never commit the real `.env` file.

## Installation

```bash
npm install
```

## Run The Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Health Check

After starting the server, visit:

```text
GET http://localhost:5000/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

## Authentication

Authentication uses JWTs stored in secure HttpOnly cookies.

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

After register or login, the API sets a cookie named `token`. Protected routes read this cookie through `authMiddleware`.

Example register body:

```json
{
  "name": "Shubham Raut",
  "email": "shubham24raut@gmail.com",
  "password": "shubham@24"
}
```

Example login body:

```json
{
  "email": "shubham24raut@gmail.com",
  "password": "shubham@24"
}
```

## Transactions

All transaction routes are protected. Login first so the `token` cookie is available.

```text
POST   /api/v1/transactions
GET    /api/v1/transactions
PUT    /api/v1/transactions/:id
DELETE /api/v1/transactions/:id
```

Example create body:

```json
{
  "amount": 199,
  "type": "expense",
  "category": "Entertainment",
  "merchant": "Netflix",
  "date": "2026-08-16"
}
```

Supported transaction query params:

```text
GET /api/v1/transactions?page=1&limit=10
GET /api/v1/transactions?type=expense
GET /api/v1/transactions?category=Food
```

Transaction access is always scoped to the authenticated user through `req.user.id`.

## Development Roadmap

### Checkpoint 1: Server Setup, MVC Foundation, and Secure Auth

- Completed
- Express server initialized
- Environment variables configured
- MongoDB connected
- `User` model created
- Auth controller and routes created
- JWT cookie authentication middleware added
- `/api/v1/auth/me` protected route added

### Checkpoint 2: Core Ledger

- Completed
- `Transaction` model created
- Transaction CRUD controllers implemented
- Protected transaction routes added
- Pagination and basic filtering implemented
- User-level data isolation enforced with `req.user.id`
- Transaction validation added

### Checkpoint 3: Budgets and Aggregations

- Next checkpoint
- Create `Budget` model
- Create budget controller
- Create analytics controller
- Add monthly summary aggregation
- Add categorized spending aggregation
- Add budget progress aggregation

### Checkpoint 4: Hardening, Middleware, and Error Handling

- Add route-level validation rules
- Add centralized error middleware
- Standardize JSON error responses
- Improve async error handling

## Git Notes

Ignored files include:

- `node_modules/`
- `.env`
- log files
- OS-generated files

Keep `.env.example` committed so required configuration is documented.
