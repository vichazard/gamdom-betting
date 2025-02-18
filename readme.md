# Online Betting Dashboard

## Objective

Develop an online betting dashboard that displays a list of sports events, the corresponding odds for the events, and allows users to place bets. Use Node.js, PostgreSQL, React, and TypeScript for this assignment.

## Features

### Backend (Node.js with PostgreSQL, Express.js)

- Connect the server with a PostgreSQL database.
- Create a table for sports events with the following columns:
  - `event_id` (Primary Key)
  - `event_name` (e.g., "Soccer: Team A vs. Team B")
  - `odds` (Decimal value, e.g., "1.75")
- Seed the database with 5 sample sports events.
- Implement an API endpoint `/api/events` to CRUD all the sports events.

### Frontend (React with TypeScript)

- Fetch and display the list of sports events from the API.
- Beside each event, show a button or link to place a bet.
- When the "place bet" option is clicked, it should open a modal or a new component to input the bet amount.
- Components should be scalable.
- No need for actual payment or confirmation – just a simple acknowledgment like "Bet placed successfully!".

## Requirements

1. Use TypeScript for both frontend and backend.
2. Style the dashboard with CSS or any CSS framework of your choice.
3. Pay attention to error handling (e.g., database connection issues, fetching API).
4. Write clear and maintainable code.
5. Imagine you're writing a task which will require updates to scale.
6. Include a README with instructions to set up and run the application.
7. Include Postman collections.
8. Make sure the code is clean!

## Bonus (Optional)

- Implement authentication to the system.
- Unit tests.
- Docker.

## Tech Stack

- **Backend**: Node.js, Express.js, PostgreSQL, JWT, Jest
- **Frontend**: React, Axios, React Query, Toastify, Styled components,

## Setup Instructions

### Prerequisite

1. Clone the repository:

   ```bash
   git clone https://github.com/vichazard/gamdom-betting.git
   cd gamdom-betting
   ```

2. Copy environment variables:

   ```bash
   # In backend directory
   cp .env.example .env

   # In frontend directory
   cp .env.example .env
   ```

3. Fill in the environment variables in both .env files with your values:

### Backend

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Run the db migration

   ```bash
   yarn db:migrate
   ```

3. Start the server

   ```bash
   yarn dev
   ```

4. Test the server

   ```bash
   yarn test
   ```

### Frontend

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the server

   ```bash
   yarn dev
   ```

3. Test the server

   ```bash
   yarn test:cy:open
   ```

4. Vist the server
   ```bash
   http://localhost:3000
   ```

### Docker Runtime (Recommended)

```bash
docker compose up
```

### Postman Collections

Include Postman collections for testing the API endpoints. Import the collection into Postman to test the CRUD operations for sports events.
