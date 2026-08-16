# Sumly Tracker Backend

Personal Finance and Budgeting Tracker REST API built with Node.js, Express, MongoDB, and Mongoose.

## Project Status

Current checkpoint: **Checkpoint 1 - Server Setup, MVC Foundation, and Secure Auth**

Completed so far:

- Node.js project initialized
- ES Modules enabled
- Express server foundation added
- Environment configuration added
- MVC folder structure created
- MongoDB Atlas connection string prepared
- Basic `/health` route available

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
    env.js

  controllers/

  middlewares/

  models/

  routes/

  utils/

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

## Development Roadmap

### Checkpoint 1: Server Setup, MVC Foundation, and Secure Auth

- Initialize Express server
- Configure environment variables
- Connect MongoDB
- Create `User` model
- Create auth controller
- Create auth routes
- Add JWT cookie authentication middleware

### Checkpoint 2: Core Ledger

- Create `Transaction` model
- Implement transaction CRUD controllers
- Add protected transaction routes
- Implement pagination
- Enforce user-level data isolation with `req.user.id`

### Checkpoint 3: Budgets and Aggregations

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
