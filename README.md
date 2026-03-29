# Buyer Portal — Full Stack Assessment

A full-stack buyer portal for a real-estate broker where users can register, login, and manage their favourite properties.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Sequelize ORM)
- **Auth:** JWT + bcrypt
- **Infrastructure:** Docker + docker-compose

## Prerequisites

- Docker Desktop installed and running
- Git

## How to Run

1. Clone the repository:

```bash
git clone <your-repo-url>
cd job-assignment
```

2. Start all services with Docker:

```bash
docker-compose up --build
```

3. Open your browser:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## Example Flows

### Register a new account

1. Go to `http://localhost:5173/register`
2. Enter your full name, email and password
3. Password must contain uppercase, lowercase, number and special character
4. Click **Register** → redirected to login page

### Login

1. Go to `http://localhost:5173/login`
2. Enter your email and password
3. Click **Login** → redirected to dashboard

### Add a Favourite Property

1. Login to your account
2. Fill in the property form on the dashboard:
   - Property Name, Address, Price, Bedrooms, Bathrooms, Description
3. Click **Add to Favourites**
4. Property appears in "My Favourites" list

### Remove a Favourite Property

1. Find the property in "My Favourites"
2. Click **Remove**
3. Confirm removal → property removed instantly

## API Endpoints

### Auth (Public)

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register new user       |
| POST   | `/api/auth/login`  | Login and get JWT token |

### Auth (Protected)

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/auth/profile` | Get logged in user profile |

### Favourites (Protected — requires JWT token)

| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| POST   | `/api/favourites/add`           | Add property to favourites |
| GET    | `/api/favourites/my-favourites` | Get all your favourites    |
| DELETE | `/api/favourites/remove/:id`    | Remove a favourite         |

## Security Features

- Passwords hashed with **bcrypt** (10 salt rounds)
- **JWT tokens** for stateless authentication (7 day expiry)
- Server-side validation with **express-validator**
- Users can **only access their own favourites** (ownership verification)
- Raw passwords never stored in database

## Project Structure

```
job-assignment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js    # API configuration
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   └── Dockerfile
├── server/                 # Node.js backend
│   ├── config/
│   │   └── database.js     # Sequelize configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── favouriteController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validationMiddleware.js
│   │   └── validators/
│   │       ├── authValidator.js
│   │       └── favouriteValidator.js
│   ├── models/
│   │   ├── User.js
│   │   └── Favourite.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── favouriteRoutes.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Database Schema

### Users Table

| Column    | Type   | Description       |
| --------- | ------ | ----------------- |
| id        | UUID   | Primary key       |
| name      | String | Full name         |
| email     | String | Unique email      |
| password  | String | Hashed password   |
| role      | String | Default: buyer    |
| createdAt | Date   | Registration date |

### Favourites Table

| Column       | Type    | Description          |
| ------------ | ------- | -------------------- |
| id           | UUID    | Primary key          |
| userId       | UUID    | Foreign key → Users  |
| propertyName | String  | Property name        |
| address      | String  | Property address     |
| price        | Float   | Property price       |
| bedrooms     | Integer | Number of bedrooms   |
| bathrooms    | Integer | Number of bathrooms  |
| description  | Text    | Property description |
| createdAt    | Date    | Date added           |
