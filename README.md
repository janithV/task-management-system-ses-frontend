# Task Management System - Frontend

## Overview
This is the **frontend** for the **Task Management System**, built using **ReactJS**. The application provides a user-friendly interface for managing tasks, including user authentication (login & register) and state management using **Redux**. The app interacts with the backend API to fetch, create, update, and delete tasks. The application is deployed on **Heroku**.

## Features
- User authentication (Login & Register)
- Redux for state management
- Fetch tasks from the backend API
- Create, update, and delete tasks
- Responsive UI
- Hosted on **Heroku**

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/janithV/task-management-system-ses-frontend
cd <project-directory>
```

### 2. Install Dependencies
Ensure you have **Node.js** (with npm version 10.7) installed.

```sh
npm install
```

### 3. Create a `.env` File
Create a `.env` file in the root directory and add the following environment variables:
```env
REACT_APP_API_URL=https://<your-backend-api-url>
REACT_APP_REQUEST_TIMEOUT= <request-timeout>
REACT_APP_SESSION_TIMEOUT= <session-timeout>
```

> **Note:** Replace `<your-backend-api-url>` with the actual API URL of the backend.

### 4. Run the Application
Start the development server using:
```sh
npm start
```
The application will run on `http://localhost:3000/` by default.

## Deployment
This application is deployed on **Heroku**. You can access it at:

[**Live Application**](<your-heroku-app-url>)

## Technologies Used
- **ReactJS** - Frontend framework
- **Redux** - State management
- **Axios** - API calls
- **Bootstrap / Tailwind CSS** - UI styling
- **Heroku** - Deployment platform

## License
This project is open-source and available under the **MIT License**.

---
Feel free to contribute or raise issues if you find any!

