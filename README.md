# Social Media Mini Project - Backend & Frontend Integration

This repository contains a **social media mini-project** with a **MERN (MongoDB, Express, React, Node.js)** stack implementation. The application allows users to create accounts, log in, create posts, like/unlike posts, comment, and perform CRUD operations. It also features frontend and backend code integration.

---

## Features

### Backend
- **User Management:**
  - Create, update, fetch, and soft-delete user accounts.
  - Authentication with **JWT tokens**.
  - Password hashing using **bcrypt**.

- **Post Management:**
  - Create, update, delete, and fetch posts.
  - Like/unlike posts.
  - Add and view comments.

- **Database:**
  - Data is stored in **MongoDB**, using **Mongoose** for schema definitions and queries.

- **Error Handling:**
  - Centralized error responses for failed API calls.

- **Environment Variables:**
  - Manage configuration via `.env` file (e.g., MongoDB connection, JWT secret).

### Frontend
- **React with Chakra UI:**
  - Responsive UI for posts and user actions.
  - Toast notifications for success and error messages.
  - Components for posts, comments, and navbar.

- **State Management:**
  - Use of React hooks (`useState`, `useEffect`) for API calls and data manipulation.

- **API Integration:**
  - Secure API calls with **Axios** using JWT tokens from localStorage.

---

## Prerequisites

1. **Node.js** and **npm** installed.
2. **MongoDB** instance running.
3. **Frontend dependencies** (React, Chakra UI).
4. `.env` file with the following keys:
   ```env
   MONGO_URL=<Your MongoDB Connection String>
   JWT_TOKEN=<Your JWT Secret>
   NODE_ENV=<development or production>
.
├── Backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── postController.js
│   ├── models/
│   │   ├── user.js
│   │   ├── post.js
│   ├── Router/
│   │   ├── userRoute.js
│   │   ├── postRoute.js
│   ├── server.js
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Card.js
│   │   ├── pages/
│   │   │   ├── Posts.js
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
└── README.md

git clone https://github.com/your-username/repo-name.git
cd repo-name

