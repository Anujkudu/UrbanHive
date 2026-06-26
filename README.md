# 🏢 UrbanHive – Housing Society Management System

## 📌 Overview

UrbanHive is a web-based Housing Society Management System developed to simplify the day-to-day management of residential communities. It provides separate dashboards for Residents, Managers, and Workers, allowing each user to perform tasks based on their role through a simple and user-friendly interface.

The project follows a client-server architecture where the frontend is responsible for the user interface and the backend manages authentication, database operations, and API services.

---

## ✨ Features

### 👤 Resident

* Secure login
* View society notices
* Register and track complaints
* Manage visitor requests
* View maintenance details
* Update personal profile

### 👨‍💼 Manager

* Manage residents and workers
* Publish society notices
* Handle complaints
* Monitor visitors
* View maintenance records
* Access management dashboard

### 👷 Worker

* Login with worker account
* View assigned work
* Update work status
* Receive notifications
* Manage profile information

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JSON Web Token (JWT)

---

## 📂 Project Structure

```text
UrbanHive/
│
├── client/              # Frontend source files
├── server/              # Backend API and database connection
├── documents/           # Project documentation
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/UrbanHive.git
```

### 2. Move into the project folder

```bash
cd UrbanHive
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` folder and add your required environment variables such as:

* MongoDB Connection URI
* JWT Secret Key

### 5. Start the backend server

```bash
npm run dev
```

### 6. Run the frontend

Open the `client` folder using any local server.

Example:

```bash
python -m http.server 5500
```

Open your browser and visit:

```
http://localhost:5500
```

---

## 📸 Screenshots

You can add screenshots of the following pages:

* Login Page
* Resident Dashboard
* Manager Dashboard
* Worker Dashboard
* Complaint Management
* Notice Board

---

## 🚀 Future Improvements

* Online maintenance payment
* Email notifications
* Mobile application
* Event management
* Emergency alert system
* AI-powered complaint categorization

---

