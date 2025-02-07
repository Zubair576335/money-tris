# Finance Tracker - Docker Setup Guide

## Prerequisites

Before running this project, make sure you have the following installed on your system:

1. **Docker Desktop** - Download and install from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. **Git** (optional) - For cloning the repository

## Quick Start

### Step 1: Open Terminal/Command Prompt

- **Windows**: Press `Win + R`, type `cmd` and press Enter
- **Mac**: Open Terminal from Applications > Utilities
- **Linux**: Open your terminal application

### Step 2: Navigate to Project Directory

```bash
cd path/to/Finance-Tracker-master
```

### Step 3: Run the Application

```bash
docker-compose up --build
```

This command will:
- Build all the Docker images
- Start the database (MySQL)
- Start the backend (Spring Boot)
- Start the frontend (React)

### Step 4: Access the Application

Once everything is running, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:3307 (if you need to connect directly)

## What Each Service Does

### Frontend (Port 3000)
- React.js application
- User interface for managing expenses
- Features: Login, Register, Add/Edit/Delete expenses

### Backend (Port 8080)
- Spring Boot Java application
- REST API for expense management
- Handles user authentication and data operations

### Database (Port 3307)
- MySQL database
- Stores user accounts and expense data
- Automatically created when first run

## Useful Commands

### Start the application:
```bash
docker-compose up
```

### Start in background (detached mode):
```bash
docker-compose up -d
```

### Stop the application:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs
```

### View logs for specific service:
```bash
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db
```

### Rebuild and start:
```bash
docker-compose up --build
```

## Troubleshooting

### If you get permission errors:
- Make sure Docker Desktop is running
- On Windows/Mac, ensure Docker Desktop has proper permissions

### If ports are already in use:
- Stop other applications using ports 3000, 8080, or 3307
- Or modify the ports in `docker-compose.yml`

### If the build fails:
- Make sure you have a stable internet connection
- Try running `docker-compose down` and then `docker-compose up --build`

### If the database connection fails:
- Wait a few minutes for MySQL to fully start
- Check logs with `docker-compose logs db`

## First Time Setup

1. Run `docker-compose up --build`
2. Wait for all services to start (this may take 5-10 minutes on first run)
3. Open http://localhost:3000 in your browser
4. Click "Register" to create a new account
5. Login with your credentials
6. Start adding your expenses!

## Data Persistence

Your data will be saved in a Docker volume, so it will persist between restarts. If you want to completely reset the data, run:

```bash
docker-compose down -v
docker-compose up --build
```

## Stopping the Application

To stop all services:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
``` 