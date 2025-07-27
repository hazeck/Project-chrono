# Chrono ⏱️ — A Productivity Habit Tracker

Chrono is a full-stack productivity tool that helps users build and track habits over time. It features a clean and responsive UI where users can log habits, monitor progress, and delete completed or unwanted habits. The app is designed to help you stay consistent and focused day-to-day.

---

## 🔧 Technologies Used

### Frontend
- React (Vite)
- JavaScript (ES6+)
- HTML/CSS

### Backend
- Python
- Flask
- Flask-CORS
- Flask-Bcrypt
- Flask-JWT-Extended
- SQLAlchemy (SQLite)

---

## 🚀 Setup & Run Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chrono.git
cd chrono
```
### 2. Run the backend (flask)
```bash
cd backend
python app.py
```
Make sure Flask, Flask-CORS, and SQLAlchemy are installed.
You can install them using:
```bash
pip install flask flask-cors flask-sqlalchemy
```
Backend will run at: http://localhost:5000


### 3 Run the Frontend (React)
cd frontend
npm install
npm run dev
Frontend will run at: http://localhost:5173

Core Functionality:
Add new habits
Save habits to backend using POST
Delete habits from local view and backend
Paginate habit list (5 per page)
Display success messages
Backend built with Flask REST API
Data persisted using SQLite database

