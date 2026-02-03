# MediBook Doctor Web Application - Healthcare Appointment Booking System

<div align="center">

![MediBook Logo](https://img.shields.io/badge/MediBook-Healthcare-0ea5e9?style=for-the-badge&logo=hospital&logoColor=white)

**A Modern Healthcare Appointment Booking Platform**

</div>

A comprehensive full-stack healthcare appointment booking system built with React (Vite.js), Node.js, Express, and MongoDB. MediBook provides a complete solution for patients to browse doctors, book appointments, and manage their healthcare needs, featuring separate user and admin dashboards.

<br>

## 📋 Table of Contents

| Section | Link |
|---------|------|
| About | [About](#about) |
| Features | [Features](#features) |
| Tech Stack | [Tech Stack](#tech-stack) |
| Architecture | [Architecture](#architecture) |
| User Roles | [User Roles](#user-roles) |
| Pages | [Pages](#pages) |
| Installation | [Installation](#installation) |
| Configuration | [Configuration](#configuration) |
| API Documentation | [API Documentation](#api-documentation) |
| Database Schema | [Database Schema](#database-schema) |
| Usage | [Usage](#usage) |
| Contributing | [Contributing](#contributing) |
| License | [License](#license) |

## 📖 About

MediBook is a full-stack healthcare appointment booking system designed to streamline the connection between patients and healthcare providers. The system features a modern React-based frontend with a robust Node.js/Express backend, supporting multiple user roles including Admin and Patient. Each role has its own dashboard with specific functionalities and permissions.

The system enables healthcare facilities to:
- Manage doctor profiles and availability
- Handle appointment bookings efficiently
- Process and approve/reject appointments
- Provide patients with seamless booking experiences
- Collect patient inquiries through contact forms

## ✨ Features

### Core Functionality
- **Multi-role Authentication & Authorization** with JWT
- **Doctor Management System** with image uploads
- **Appointment Booking** with status tracking
- **Real-time Availability Toggle** for doctors
- **Contact Form** for patient inquiries
- **Newsletter Subscription** system
- **Responsive Landing Page** with modern UI

### Advanced Features
- **Doctor Image Upload** with preview functionality
- **Appointment Status Management** (pending/approved/rejected)
- **Role-based Dashboards** for users and admins
- **Protected Routes** with authentication guards
- **RESTful API Architecture** for easy integration
- **Comprehensive Admin Panel** for system management

## 🛠 Tech Stack

### Backend
| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Token-based authentication |
| **bcryptjs** | Password hashing |
| **Multer** | File upload handling |

### Frontend
| Technology | Description |
|------------|-------------|
| **React 18** | UI library |
| **Vite.js** | Build tool and development server |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **Bootstrap 5** | CSS framework |
| **Custom CSS** | Additional styling |

### Development Tools
- **VS Code** - IDE
- **MongoDB Compass** - Database management
- **Postman** - API testing
- **Git** - Version control
- **Nodemon** - Development server

## 🏗 Architecture

The system follows a layered architecture pattern:

```
┌─────────────────────┐    ┌─────────────────────┐
│      Frontend       │    │       Backend       │
│      (React)        │◄──►│   (Express.js)      │
├─────────────────────┤    ├─────────────────────┤
│ • Components        │    │ • Controllers       │
│ • Services (API)    │    │ • Services          │
│ • Context (Auth)    │    │ • Middleware        │
│ • Routing           │    │ • Models            │
└─────────────────────┘    └─────────────────────┘
                                    │
                           ┌─────────────────────┐
                           │      MongoDB        │
                           │      Database       │
                           └─────────────────────┘
```

### Project Structure

```
login_and_register/
├── client/                        # React Frontend
│   └── src/
│       ├── components/
│       │   ├── Auth/              # Login, Register
│       │   ├── Dashboard/         # User & Admin Dashboards
│       │   ├── Landing/           # 13 landing page sections
│       │   └── UI/                # Reusable components
│       ├── context/               # AuthContext (JWT)
│       ├── services/              # API service layer
│       ├── pages/                 # BookingPage
│       └── styles/                # CSS files
│
└── server/                        # Node.js Backend
    ├── config/                    # Database connection
    ├── controllers/               # Business logic
    ├── middleware/                # Auth, Error, Upload
    ├── models/                    # Mongoose schemas
    ├── routes/                    # API routing
    └── uploads/                   # Doctor images
```

## 👥 User Roles

### 1. **Admin**
- System-wide management and oversight
- Manage all appointments (approve/reject)
- Add, edit, delete doctors with image upload
- Toggle doctor availability status
- View all bookings and patient details

### 2. **Patient (User)**
- Browse available doctors
- View doctor profiles and availability
- Book appointments with selected doctors
- View personal appointment history
- Track appointment status (pending/approved/rejected)

## � Pages

### Landing Page

| Hero Section | Features Section | Features Section (cont.) |
|--------------|------------------|--------------------------|
| ![Hero](images/LandingHero1.png) | ![Features](images/LandingFeatures2.png) | ![Features](images/LandingFeatures3.png) |

| About Section | About Section (cont.) | How It Works |
|---------------|----------------------|--------------|
| ![About](images/LandingAbout4.png) | ![About](images/LandingAbout5.png) | ![HowItWorks](images/LandingHowItWorks6.png) |

| Doctors Section | Doctors Section (cont.) | Testimonials |
|-----------------|------------------------|--------------|
| ![Doctors](images/LandingDoctors7.png) | ![Doctors](images/LandingDoctors8.png) | ![Testimonials](images/LandingTestimonials9.png) |

| Booking Form | FAQ Section | FAQ Section (cont.) |
|--------------|-------------|---------------------|
| ![BookingForm](images/LandingBookingForm10.png) | ![FAQ](images/LandingFAQ11.png) | ![FAQ](images/LandingFAQ12.png) |

| Contact Section | Contact Section (cont.) | Footer |
|-----------------|-------------------------|--------|
| ![Contact](images/LandingContact13.png) | ![Contact](images/LandingContact14.png) | ![Footer](images/LandingFooter15.png) |

### Authentication Pages

| Login | Register | Admin Login |
|-------|----------|-------------|
| ![Login](images/Login1.png) | ![Register](images/Register2.png) | ![AdminLogin](images/Login3.png) |

### Admin Dashboard

| Booking Management | Doctor Management | Add New Doctor | Doctor Management (All) |
|--------------------|-------------------|----------------|-------------------------|
| ![BookingManagement](images/AdminBookingManagement1.png) | ![DoctorManagement](images/AdminDoctorManagement2.png) | ![AddDoctor](images/AdminAddDoctor3.png) | ![DoctorsList](images/AdminDoctorManagement4.png) |

### User Dashboard

| User Login | User Dashboard | Booking Confirmation | Booking Form |
|------------|----------------|---------------------|--------------|
| ![UserLogin](images/UserLogin1.png) | ![UserDashboard](images/UserDashboard1.png) | ![BookingConfirmed](images/UserBookingConfirmation2.png) | ![BookingForm](images/UserBookingForm3.png) |

| User Appointments |
|-------------------|
| ![UserAppointments](images/UserDashboardAppointments4.png) |

## 🚀 Installation

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd login_and_register
   ```

2. **Navigate to server directory**
   ```bash
   cd server
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   # Create .env file with:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/medibook
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medibook
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**Frontend Configuration**
API base URL is configured in `client/src/services/api.jsx`:
```javascript
const API_URL = "http://localhost:5000/api";
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

### Doctor Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors |
| GET | `/api/doctors/:id` | Get single doctor |
| POST | `/api/doctors` | Create doctor (Admin) |
| PUT | `/api/doctors/:id` | Update doctor (Admin) |
| DELETE | `/api/doctors/:id` | Delete doctor (Admin) |

### Appointment Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | User's appointments |
| GET | `/api/appointments/all` | All appointments (Admin) |
| POST | `/api/landing/book` | Create appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Delete appointment |

### Landing Page

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/landing/contact` | Submit contact form |
| POST | `/api/landing/newsletter` | Subscribe to newsletter |

## 🗄️ Database Schema

### Collections

| Collection | Key Fields |
|------------|------------|
| **users** | name, email, password (hashed), role (user/admin), createdAt |
| **doctors** | name, specialty, experience, rating, reviews, image, available, bio |
| **appointments** | name, email, phone, date, time, doctor (ref), status, message |
| **contacts** | name, email, subject, message |
| **newsletters** | email |

### Relationships
- Appointments reference Doctors (ObjectId)
- Users have role-based access (user/admin)

## 📖 Usage

### For Administrators

1. **Login** with admin credentials
2. **Manage Doctors** - Add new doctors with profile images
3. **Review Appointments** - Approve or reject patient bookings
4. **Toggle Availability** - Mark doctors as busy/available
5. **View Details** - Click on bookings to see patient information

### For Patients

1. **Browse** the landing page to see available doctors
2. **Register/Login** to access the patient dashboard
3. **Book Appointment** - Select a doctor and choose date/time
4. **Track Status** - View appointment status in dashboard
5. **Contact** - Use the contact form for inquiries

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use ESLint for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 MediBook Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 🚀 Deployment

### Production Deployment

1. **Backend Deployment**
   ```bash
   cd server
   npm install
   npm start
   ```
   - Configure production MongoDB URI
   - Set secure JWT secret
   - Configure reverse proxy (Nginx)

2. **Frontend Deployment**
   ```bash
   cd client
   npm run build
   ```
   - Deploy `dist` folder to web server
   - Update API URL for production

---

<div align="center">

**Built with ❤️ for better healthcare accessibility**

</div>
