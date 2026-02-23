# 🏨 Accommodation Backend API

Scalable and modular RESTful backend for accommodation management systems.  
Built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize ORM**.

This project provides a production-ready backend infrastructure for managing accommodations, units, bookings, users, roles, and hierarchical location data.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Role-Based Access Control (RBAC)

---

## 🏗 Architecture

The project follows a layered architecture:

Controller → Service → Model → Database

### Key Design Decisions

- UID-based CRUD operations (no direct ID exposure)
- Standardized API response structure (`successResponse` / `errorResponse`)
- Clean separation of concerns
- Centralized error handling
- Modular and extensible structure

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control:
  - `admin`
  - `owner`
  - `user`

Protected routes require a valid token in the `Authorization` header:
