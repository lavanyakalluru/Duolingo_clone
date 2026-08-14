Duolingo Clone

A full-stack language-learning web application inspired by the core learning experience of Duolingo.

The project is built with Next.js for the frontend, FastAPI for the backend, and SQLite for data persistence. The frontend and backend are maintained as separate applications and communicate through REST APIs.

📌 Project Overview

This project was developed as a Duolingo-style learning platform where users can interact with language-learning content through an interactive web interface.

The application follows a client-server architecture:

┌──────────────────────────────┐
│          Frontend            │
│       Next.js / React        │
│                              │
│  User Interface              │
│  Lessons                     │
│  Questions                   │
│  Answer Interaction          │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│           Backend            │
│           FastAPI            │
│                              │
│  API Routes                  │
│  Application Logic           │
│  Data Validation             │
└──────────────┬───────────────┘
               │
               │ SQL
               ▼
┌──────────────────────────────┐
│           SQLite             │
│          Database            │
└──────────────────────────────┘
✨ Features

The application provides a Duolingo-inspired learning experience with:

Interactive language-learning interface
Lesson-based learning
Questions and answer interactions
Answer evaluation
Learning progress handling
Score/progress updates
Dynamic frontend pages
Backend REST APIs
SQLite database persistence
FastAPI API documentation through Swagger UI
Separate frontend and backend applications

This project focuses on the implemented learning functionality and does not include a user registration system.

🛠️ Tech Stack
Frontend
Next.js
React
TypeScript
CSS / styling used in the project
Backend
Python
FastAPI
Uvicorn
Pydantic
Database
SQLite
Development & Testing
Git
GitHub
VS Code
Swagger UI
Postman / API testing tools
📁 Project Structure

The project is organized into separate frontend and backend applications.

Duolingo/
│
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   ├── ...
│   │
│   └── ...
│
├── Backend/
│   ├── app/
│   ├── ...
│   ├── requirements.txt
│   ├── ...
│   │
│   └── venv/
│
├── .gitignore
└── README.md

The exact internal files and folders depend on the final implementation.

🏗️ Architecture

The project follows a three-layer client-server architecture.

1. Frontend Layer

The Next.js frontend is responsible for:

Rendering the application UI
Displaying learning content
Handling user interactions
Receiving user answers
Communicating with the backend
Displaying results and progress
2. Backend Layer

The FastAPI backend is responsible for:

Exposing REST API endpoints
Processing frontend requests
Validating request data
Handling application logic
Reading and updating database records
Returning JSON responses
3. Database Layer

SQLite is used to persist the application's data.

The backend communicates with SQLite and provides the required data to the frontend through API endpoints.

🔄 Application Flow

The general application flow is:

User
  │
  ▼
Next.js Frontend
  │
  │ HTTP Request
  ▼
FastAPI Backend
  │
  │ Database Query
  ▼
SQLite
  │
  │ Data
  ▼
FastAPI
  │
  │ JSON Response
  ▼
Next.js Frontend
  │
  ▼
Updated UI

For a learning interaction:

User selects learning content
        ↓
Frontend requests required data
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
Result/progress is updated
        ↓
Frontend displays the updated state
🗄️ Database

The project uses SQLite as the database.

SQLite was selected because it is lightweight and does not require a separate database server.

The database stores the application's learning-related data.

The logical data relationships can be represented as:

Lesson
   │
   └── Questions
          │
          └── Answer / Result

Learning/progress-related information is associated with the relevant learning content.

The exact tables and columns are defined by the backend database models used in the project.

🔌 Backend API

The backend is implemented using FastAPI.

FastAPI provides REST endpoints that are consumed by the Next.js frontend.

The API is responsible for operations such as:

Retrieving learning content
Retrieving questions
Processing answers
Updating learning-related information
Returning data to the frontend

The exact endpoint definitions are available in the FastAPI application.

📖 API Documentation

FastAPI automatically provides interactive API documentation using Swagger UI.

After starting the backend, open:

http://127.0.0.1:8000/docs

Swagger UI can be used to:

View available endpoints
View request parameters
View request/response schemas
Send API requests
Test the backend without the frontend

FastAPI also provides ReDoc:

http://127.0.0.1:8000/redoc
⚙️ Installation & Setup
Prerequisites

Install the following before running the project:

Python 3.x
Node.js
npm
Git
🐍 Backend Setup

Open a terminal and navigate to the backend:

cd Backend
1. Create a Virtual Environment
python -m venv venv
2. Activate the Virtual Environment
Windows
venv\Scripts\activate

For PowerShell:

.\venv\Scripts\Activate.ps1

After activation, the terminal should show something similar to:

(venv)
3. Install Dependencies
pip install -r requirements.txt
4. Start the FastAPI Server

Run the FastAPI application using Uvicorn.

For example:

uvicorn app.main:app --reload

If the project's main.py is located differently, use the corresponding module path.

The backend will normally be available at:

http://127.0.0.1:8000

Swagger documentation:

http://127.0.0.1:8000/docs
⚛️ Frontend Setup

Open a new terminal.

Navigate to the frontend directory:

cd Frontend

Install the required Node.js dependencies:

npm install

Start the Next.js development server:

npm run dev

The frontend will normally be available at:

http://localhost:3000
🔗 Frontend and Backend Communication

The Next.js frontend communicates with the FastAPI backend through HTTP requests.

The general flow is:

Next.js
   │
   │ fetch()
   │
   ▼
FastAPI
   │
   ▼
SQLite

The backend returns JSON data, which is then used by the frontend to update the user interface.

🗃️ SQLite Configuration

SQLite stores the database locally as a database file.

A typical SQLite connection can look like:

sqlite:///./database.db

The actual database filename and connection configuration should match the configuration used in the project.

SQLite was chosen because:

It is lightweight
It requires no separate database server
It is simple to configure
It works well for local development
It is suitable for a small educational application
🧪 Testing
Backend Testing

The FastAPI Swagger interface can be used to test the backend:

http://127.0.0.1:8000/docs

API testing can also be performed using Postman.

The backend can therefore be tested independently from the frontend.

Frontend Testing

The frontend can be tested by running:

npm run dev

and opening:

http://localhost:3000

The main user interactions can then be tested directly through the browser.

🔐 Configuration

Configuration values that vary between environments should be stored using environment variables rather than hard-coded values.

For example, the frontend can use a backend API URL such as:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

The exact environment variables depend on the project's implementation.

Sensitive configuration files should not be committed to GitHub.

Example .gitignore entries:

.env
.env.local
venv/
__pycache__/
*.pyc
🌳 Git Repository Structure

The project contains both frontend and backend code.

Therefore, the complete project should be maintained as a single repository with:

Duolingo/
├── Frontend/
├── Backend/
├── .gitignore
└── README.md

The Python virtual environment should not be committed to GitHub.

Instead of uploading:

Backend/venv/

the project should include:

Backend/requirements.txt

This allows another developer to recreate the virtual environment using:

python -m venv venv
pip install -r requirements.txt
🚀 Running the Complete Application

Two terminals are required during local development.

Terminal 1 — Backend
cd Backend
venv\Scripts\activate
uvicorn app.main:app --reload
Terminal 2 — Frontend
cd Frontend
npm install
npm run dev

Then open:

http://localhost:3000

The frontend communicates with the FastAPI backend running on:

http://127.0.0.1:8000
📦 Dependencies
Backend

Backend dependencies are maintained in:

Backend/requirements.txt

Install them using:

pip install -r requirements.txt
Frontend

Frontend dependencies are maintained in:

Frontend/package.json

Install them using:

npm install
🧠 Key Concepts Demonstrated

This project demonstrates practical knowledge of:

Next.js
React
TypeScript
Python
FastAPI
REST APIs
HTTP request/response cycle
JSON
SQLite
Database integration
API testing
Frontend-backend integration
Component-based UI development
Git and GitHub
Virtual environments
Full-stack web application architecture
📋 Assumptions
The project is intended as a Duolingo-inspired educational clone.
Next.js is used for the frontend.
FastAPI is used for the backend.
SQLite is used for persistent data storage.
Frontend and backend are run as separate applications during development.
FastAPI Swagger UI is used for API inspection and testing.
The Python virtual environment is created locally and is not committed to the repository.
The application does not implement a user registration feature.
The README describes the implemented project architecture rather than the complete feature set of the original Duolingo platform.
🔮 Future Improvements

Possible future improvements include:

User authentication
User profiles
Daily streaks
Leaderboards
More lessons and languages
Additional question types
Audio-based exercises
Gamification features
Achievement system
Improved progress analytics
PostgreSQL for production-scale data storage
Automated unit and integration tests
Docker-based deployment
CI/CD pipeline

These are potential extensions and are not part of the current implementation.

👩‍💻 Author

Kalluru Lavanya

B.Tech – Computer Science & Engineering
Lovely Professional University

📄 License

This project was developed for educational and demonstration purposes.

It is a Duolingo-inspired clone and is not affiliated with or endorsed by Duolingo.
