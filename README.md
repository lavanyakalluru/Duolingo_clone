# Duolingo Clone

A full-stack language-learning web application inspired by Duolingo. The project provides an interactive learning experience with lessons, questions, answer evaluation, and progress tracking.

## Overview

This project is built using Next.js for the frontend, FastAPI for the backend, and SQLite for database persistence.

The frontend and backend are maintained separately and communicate through REST APIs.

## Features

- Duolingo-inspired learning interface
- Interactive lessons
- Interactive questions and answers
- Answer evaluation
- Learning progress tracking
- Score and progress updates
- Dynamic frontend interface
- REST API backend
- SQLite database
- Swagger UI for API testing
- Separate frontend and backend applications

> Note: This project does not include user registration or login functionality.

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### Database

- SQLite

### Tools

- Git
- GitHub
- VS Code
- Swagger UI
- Postman

## Project Structure

    Duolingo/
    │
    ├── Frontend/
    │   ├── app/
    │   ├── components/
    │   ├── public/
    │   ├── package.json
    │   └── ...
    │
    ├── Backend/
    │   ├── app/
    │   ├── requirements.txt
    │   └── ...
    │
    ├── .gitignore
    └── README.md

## Architecture

The application follows a client-server architecture.

    User
      │
      ▼
    Next.js Frontend
      │
      │ REST API
      ▼
    FastAPI Backend
      │
      │ Database Operations
      ▼
    SQLite Database

### Frontend

The Next.js frontend is responsible for:

- Rendering the application interface
- Displaying learning content
- Displaying questions
- Handling user interactions
- Submitting answers
- Communicating with the backend
- Displaying results and progress

### Backend

The FastAPI backend is responsible for:

- Providing REST API endpoints
- Processing frontend requests
- Validating data
- Handling application logic
- Communicating with SQLite
- Returning JSON responses

### Database

SQLite is used to store the application's learning-related data and progress information.

## Application Flow

    User selects learning content
            ↓
    Next.js frontend requests data
            ↓
    FastAPI receives the request
            ↓
    Backend retrieves data from SQLite
            ↓
    Data is returned to frontend
            ↓
    Question is displayed
            ↓
    User submits an answer
            ↓
    Backend processes the answer
            ↓
    Score/progress is updated
            ↓
    Frontend displays the result

## Database

The project uses SQLite as the database.

SQLite was selected because it is lightweight, easy to configure, and does not require a separate database server.

The logical relationship between the learning content can be represented as:

    Lesson
       │
       └── Questions
              │
              └── Answer / Result

The exact tables and columns are defined by the database models implemented in the backend.

## Backend API

The backend is implemented using FastAPI.

The API is responsible for:

- Retrieving learning content
- Retrieving questions
- Processing answers
- Updating learning-related information
- Returning data to the frontend

The exact API endpoints are defined in the FastAPI backend.

## API Documentation

FastAPI automatically provides interactive API documentation using Swagger UI.

After starting the backend, open:

    http://127.0.0.1:8000/docs

Swagger UI can be used to:

- View available API endpoints
- View request parameters
- View request and response schemas
- Test API endpoints
- Debug backend functionality

FastAPI also provides ReDoc at:

    http://127.0.0.1:8000/redoc

## Installation and Setup

### Prerequisites

Make sure the following are installed:

- Python 3.x
- Node.js
- npm
- Git

## Backend Setup

Navigate to the backend directory:

    cd Backend

Create a Python virtual environment:

    python -m venv venv

Activate the virtual environment on Windows:

    venv\Scripts\activate

For PowerShell:

    .\venv\Scripts\Activate.ps1

Install the backend dependencies:

    pip install -r requirements.txt

Start the FastAPI server:

    uvicorn app.main:app --reload

If the location of main.py is different in the project, use the corresponding module path.

The backend will normally run at:

    http://127.0.0.1:8000

Swagger UI:

    http://127.0.0.1:8000/docs

## Frontend Setup

Open a new terminal and navigate to the frontend:

    cd Frontend

Install the dependencies:

    npm install

Start the Next.js development server:

    npm run dev

The frontend will normally run at:

    http://localhost:3000

## Running the Complete Application

Run the backend and frontend in separate terminals.

### Terminal 1 — Backend

    cd Backend
    venv\Scripts\activate
    uvicorn app.main:app --reload

### Terminal 2 — Frontend

    cd Frontend
    npm run dev

Then open the application in your browser:

    http://localhost:3000

The frontend communicates with the FastAPI backend running at:

    http://127.0.0.1:8000

## Frontend-Backend Communication

The Next.js frontend communicates with the FastAPI backend using HTTP requests.

The communication flow is:

    Next.js
       │
       │ HTTP / REST API
       ▼
    FastAPI
       │
       │ Database Operations
       ▼
    SQLite

FastAPI returns JSON responses that are consumed by the Next.js frontend.

## SQLite Configuration

The application uses SQLite for data persistence.

A typical SQLite connection string is:

    sqlite:///./database.db

The actual database filename and configuration depend on the implementation in the backend.

SQLite is suitable for this project because:

- It is lightweight
- It requires no separate database server
- It is easy to set up
- It is suitable for local development
- It simplifies the setup of a small application

## Testing

### Backend Testing

The FastAPI Swagger interface can be used to test the APIs:

    http://127.0.0.1:8000/docs

Postman can also be used for API testing.

### Frontend Testing

Run:

    npm run dev

Then open:

    http://localhost:3000

Test the learning flow and user interactions directly through the browser.

## Git and GitHub

The project is organized as a single repository containing both the frontend and backend:

    Duolingo/
    ├── Frontend/
    ├── Backend/
    ├── .gitignore
    └── README.md

The Python virtual environment should not be pushed to GitHub.

The following should be included in .gitignore:

    Backend/venv/
    __pycache__/
    *.pyc
    Frontend/node_modules/
    Frontend/.next/
    .env
    .env.local
    *.db
    *.sqlite
    *.sqlite3

Backend dependencies are maintained in:

    Backend/requirements.txt

Frontend dependencies are maintained in:

    Frontend/package.json

## Key Concepts Demonstrated

This project demonstrates practical knowledge of:

- Next.js
- React
- TypeScript
- Python
- FastAPI
- REST API development
- HTTP request and response cycle
- JSON
- SQLite
- Database integration
- API testing
- Frontend-backend integration
- Component-based UI development
- Git and GitHub
- Python virtual environments
- Full-stack web application architecture

## Assumptions

- The project is a Duolingo-inspired educational application.
- Next.js is used for the frontend.
- FastAPI is used for the backend.
- SQLite is used for persistent data storage.
- The frontend and backend run as separate applications.
- FastAPI Swagger UI is used for API testing.
- The Python virtual environment is created locally and is not committed to GitHub.
- The application does not include user registration or login functionality.
- The project implements a subset of the functionality available in the original Duolingo platform.

## Future Improvements

Possible future improvements include:

- User authentication
- User profiles
- Daily streaks
- Leaderboards
- Additional lessons
- Multiple languages
- More question types
- Audio-based exercises
- Achievement system
- Improved progress analytics
- PostgreSQL for production
- Automated tests
- Docker deployment
- CI/CD pipeline

These are future improvements and are not part of the current implementation.

## Author

**Kalluru Lavanya**

B.Tech – Computer Science & Engineering  
Lovely Professional University

## License

This project was developed for educational and demonstration purposes.

This is a Duolingo-inspired clone and is not affiliated with or endorsed by Duolingo.
