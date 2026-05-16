# Redis Beginner's Guide

### Repo for understanding Redis - in-memory data store

This project uses Docker to run Redis as well as MongoDB, and a Node.js Express server to interact with them.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed and running.
- [Node.js](https://nodejs.org/) (v18 or higher) installed.
- [npm](https://www.npmjs.com/) (usually comes with Node.js).

## Setup & Running

### 1. Start Infrastructure (Redis & MongoDB)

In the root directory, run:

```bash
docker-compose up -d
```

This will start Redis on port `6379` and MongoDB on port `27017` in the background.

### 2. Start the Node.js Server

Navigate to the `local-setup` directory and start the dev server:

```bash
cd local-setup
npm install
npm run dev
```

The server will start listening at `http://localhost:8000`.

## API Endpoints

You can test the setup using the following endpoints:

- **Check Redis connection**: `GET http://localhost:8000/redis`
- **Check MongoDB connection**: `GET http://localhost:8000/mongo`

## Stopping the Project

To stop the Docker containers, run:

```bash
docker-compose down
```