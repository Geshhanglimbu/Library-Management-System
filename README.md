# Library Management System

A full-stack web and mobile application for managing books, borrowers, and librarians with role-based access control.  
The system provides a seamless way to handle book catalog management, borrowing/returning, and user authentication.

---

##  Project Overview
This Library Management System is designed to simplify library operations by allowing:
- **Librarians** to manage books, add books/ users, and oversee members.
- **Borrowers** to search books, borrow/return them.

The system consists of:
- **Web Application (React)** – for librarians and borrowers to access via browser.  
- **Mobile Application (React Native)** – for borrowers to browse and borrow books on the go.  
- **Backend (Express.js + Node.js)** – REST API handling authentication, borrowing system, and data management.  
- **Database (MongoDB Atlas)** – cloud-based storage for users, books, and transactions.

---

## 🛠️ Tech Stack
- **Frontend (Web)**: React + TailwindCSS  
- **Mobile App**: React Native + Expo  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB Atlas (NoSQL)  
- **Authentication**: JWT (JSON Web Token)  
- **Deployment**: Render (Backend), Vercel/Netlify (Frontend), Expo (Mobile)

---

##  Project Structure
│── backend/ # Express.js backend API
│── frontend/ # React web frontend
│── mobileApp/ # React Native mobile app
│── README.md # Project documentation

Backend Setup
- npm start

Frontent Setup
- npm run dev

monbileApp setup
-npx expo start
