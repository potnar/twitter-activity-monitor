# Twitter Activity Monitor

An application for monitoring Twitter activity. It consists of a backend (Node.js + Express + Prisma) and a frontend React application.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Features](#features)
- [Technologies](#technologies)
- [Author](#author)

---

## Requirements

- Node.js >= 18
- npm >= 9
- (optional) Docker for running the database

## Installation

1. Clone the repository:

   ```sh
   git clone <repository_url>
   cd twitter-activity-monitor
   ```

2. Install dependencies for both backend and frontend:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Configure the `.env` file in the `backend` directory (example below):

   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/twitter_monitor"
   ```

4. (Optional) Run the database locally or using Docker.

## Running the Project

### Backend

```sh
cd backend
npx prisma migrate dev
npm run dev
```

The backend server runs on port `3001` by default.

### Frontend

```sh
cd frontend
npm start
```

The frontend application runs on port `3000` by default.

## Project Structure

```
twitter-activity-monitor/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── jobs/
│   │   └── ...
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

## Testing

### Backend

Run tests with:

```sh
cd backend
npm test
```

Tests are located in files with the `.test.ts` extension in the `src` directory.

### Frontend

You can add React component tests using e.g. `@testing-library/react`.

## Features

- Add and monitor Twitter profiles
- Display a list of profiles
- Display activity alerts
- Activity submission form

## Technologies

- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:** React, TypeScript, Axios, TailwindCSS

## Author

Mikołaj Cholewa
