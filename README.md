# Learning Management System (LMS)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-14%2B-green.svg)
![Express](https://img.shields.io/badge/express-4.x-lightgrey.svg)
![SQLite](https://img.shields.io/badge/database-SQLite3-blue.svg)

A full-featured Learning Management System built entirely from scratch with Node.js, Express, SQLite, and vanilla JavaScript. This project demonstrates my ability to design and implement a complete web application with proper authentication, database modeling, and RESTful APIs.

Unlike template-based projects, this LMS was built entirely from the ground up with a clean MVC architecture, demonstrating my proficiency in backend development, database design, and frontend integration.

## 🌟 Why This Project Stands Out

- **No Templates**: Built completely from scratch without using boilerplates or generators
- **Full-Stack Implementation**: Demonstrates both frontend and backend development skills
- **Security Focused**: Implements JWT authentication, password hashing, and SQL injection prevention
- **Production Ready**: Includes proper error handling, validation, and deployment considerations
- **Clean Code**: Well-organized MVC architecture with clear separation of concerns

## 🎯 Project Overview

A complete, production-ready Learning Management System showcasing full-stack development skills. This project demonstrates my ability to build secure, scalable web applications with proper architecture and best practices.

### Key Features
- **User Management**: Secure JWT-based authentication with bcrypt password hashing
- **Role-Based Access**: Distinct interfaces for students and administrators
- **Course Management**: Full CRUD operations for course content (admin only)
- **Enrollment System**: Students can enroll in courses and track progress
- **Responsive UI**: Clean, mobile-friendly interface built with vanilla JavaScript
- **Data Security**: Prepared statements to prevent SQL injection, secure password storage
- **Clean Architecture**: MVC pattern with clear separation of concerns

## 🧱 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Environment**: dotenv for configuration
- **Deployment**: Render / Railway ready

## ✨ Features

### User Management
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Role-based access control (Admin, Student)
- ✅ Password hashing with bcrypt
- ✅ Token verification on protected routes

### Course Management
- ✅ Create, Read, Update, Delete (CRUD) courses (Admin only)
- ✅ Browse all available courses
- ✅ Course descriptions and metadata
- ✅ Instructor assignment

### Enrollment System
- ✅ Students can enroll in courses
- ✅ Prevent duplicate enrollments
- ✅ Track enrollment status (in_progress, completed)
- ✅ View enrolled students (Admin/Instructor)
- ✅ Unenroll from courses

### Dashboard
- ✅ Student dashboard with enrolled courses
- ✅ Admin dashboard to manage courses
- ✅ Progress tracking
- ✅ Enrollment status display

### Frontend UI
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modern and clean interface
- ✅ Form validation
- ✅ Alert notifications
- ✅ Error handling

## 📁 Clean Project Structure

This project follows a clean MVC architecture with a clear separation between backend API and frontend UI:

```
lms-project/
├── backend/                 # REST API (Node.js + Express)
│   ├── server.js            # Server entry point
│   ├── app.js               # Express app configuration
│   ├── routes/              # API route definitions
│   ├── controllers/         # Business logic
│   ├── middlewares/         # Custom middleware
│   ├── db/                  # Database initialization
│   ├── utils/               # Helper functions
│   └── .env.example         # Environment variables template
├── frontend/                # Client-side UI (HTML + CSS + JS)
│   ├── index.html           # Home page
│   ├── login.html           # Authentication page
│   ├── dashboard.html       # User dashboard
│   ├── courses.html         # Course listings
│   ├── css/                 # Stylesheets
│   └── js/                  # Client-side JavaScript
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## 🗄️ Database Schema

### Users Table
```sql
users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'student' CHECK(role IN ('admin', 'student')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Courses Table
```sql
courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id)
)
```

### Enrollments Table
```sql
enrollments (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  status TEXT DEFAULT 'in_progress' CHECK(status IN ('in_progress', 'completed')),
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE(user_id, course_id)
)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm package manager

### Quick Start

1. **Clone and setup the project**
```bash
git clone <repository-url>
cd lms-project
npm install
```

2. **Configure environment variables**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set a strong JWT_SECRET:
```
PORT=5000
JWT_SECRET=your-very-secure-secret-here
NODE_ENV=development
```

3. **Run the application**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm start` - Start production server
- `npm test` - Run test suite (if available)

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| JWT_SECRET | Secret key for JWT signing | your-secret-key-change-in-production |
| NODE_ENV | Environment mode | development |

**⚠️ Important**: Change `JWT_SECRET` in production to a strong, random value.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/admin/my-courses` - Get admin's courses

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/my-enrollments` - Get student's enrollments
- `GET /api/enrollments/course/:course_id` - Get course enrollments (Admin/Instructor)
- `PUT /api/enrollments/:enrollment_id` - Update enrollment status
- `DELETE /api/enrollments/:enrollment_id` - Unenroll from course

## 🔐 Authentication Flow

1. User registers or logs in with email and password
2. Password is hashed using bcrypt before storage
3. JWT token is generated upon successful authentication
4. Token is stored in browser's localStorage
5. Token is sent in Authorization header for protected API calls
6. Backend verifies token using middleware
7. User information is extracted from token

## 🎨 Frontend Pages

### Home Page (`/`)
- Welcome hero section
- Feature highlights
- Quick navigation links
- Responsive design

### Login/Register Page (`/login.html`)
- Toggle between login and registration modes
- Email validation
- Password strength validation
- Error messages
- Secure form handling

### Dashboard (`/dashboard.html`)
- Student view: Enrolled courses with progress
- Admin view: Course management interface
- User profile display
- Logout functionality

### Courses Page (`/courses.html`)
- List all available courses
- Enroll button for authenticated users
- Login prompt for non-authenticated users
- Responsive course cards

## 🧪 Testing the Application

### Quick Testing Guide

1. **Register a new user** at `http://localhost:5000/login.html`
2. **Make the user an admin** by updating the database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-registered-email@example.com';
   ```
3. **Test the workflows**:
   - **As a Student**: Register → Login → Browse Courses → Enroll → View Dashboard
   - **As an Admin**: Login → Create Course → Manage Content → View Enrollments

### API Endpoints
All API endpoints are documented in the [API Documentation](#-api-endpoints) section below.

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ CORS enabled for frontend communication
- ✅ Input validation on all endpoints
- ✅ Role-based access control (RBAC)
- ✅ SQL injection prevention via parameterized queries
- ✅ No plaintext passwords in database
- ✅ HTTP-only authentication (recommended for production)

## 📊 Performance Considerations

- SQLite is suitable for small to medium deployments
- For larger scale, consider migrating to PostgreSQL
- Implement caching for frequently accessed data
- Add pagination for course listings
- Consider adding database indexes for common queries

## 🚀 Deployment

### Render.com
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

### Railway.app
1. Connect your GitHub account
2. Create new project
3. Select your repository
4. Set environment variables
5. Deploy automatically

### Production Checklist
- [ ] Change JWT_SECRET to a strong random value
- [ ] Set NODE_ENV to 'production'
- [ ] Enable HTTPS only
- [ ] Set secure headers
- [ ] Configure CORS properly
- [ ] Use environment variables for all secrets
- [ ] Enable database backups
- [ ] Set up error logging
- [ ] Monitor application performance

## 🛠️ Technical Skills Demonstrated

This project showcases proficiency in:

- **Backend Development**: Node.js, Express.js, RESTful API design
- **Database Management**: SQLite, SQL schema design, query optimization
- **Authentication & Security**: JWT, bcrypt, role-based access control
- **Frontend Development**: HTML5, CSS3, Vanilla JavaScript, DOM manipulation
- **Software Architecture**: MVC pattern, separation of concerns
- **DevOps**: Environment configuration, deployment strategies
- **Best Practices**: Input validation, error handling, code organization

## 🔄 Future Improvements

- [ ] Add course categories and tags
- [ ] Implement course modules and lessons
- [ ] Add student discussion forums
- [ ] Implement certificate generation
- [ ] Add course ratings and reviews
- [ ] Email notifications for enrollments
- [ ] Progress percentage calculations
- [ ] Bulk user import for admins
- [ ] Advanced search and filtering
- [ ] Activity logging and audit trails
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSockets)
- [ ] Video upload and streaming
- [ ] Quiz and assessment system
- [ ] Payment integration for premium courses

## 📝 Code Quality Standards

- Clean MVC architecture
- No hardcoded secrets or configuration
- Comprehensive error handling
- Input validation on all endpoints
- Meaningful error messages
- Proper HTTP status codes
- Consistent code style
- No console.log debugging statements

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 📞 Support

For issues or questions:
1. Check the README and code comments
2. Review the API endpoints documentation
3. Check database schema
4. Verify environment variables are set correctly

## 💡 Key Learnings

Developing this LMS taught me valuable lessons in:
- Building secure authentication systems with JWT and bcrypt
- Designing normalized database schemas with proper relationships
- Implementing role-based access control
- Creating RESTful APIs with proper HTTP status codes and error handling
- Structuring applications using the MVC pattern
- Validating user input to prevent security vulnerabilities
- Managing frontend state with vanilla JavaScript

## 👨‍💻 Author

This project was designed and developed by me as a demonstration of full-stack web development skills. It showcases my ability to build secure, scalable web applications with proper architecture and best practices.

---

**Happy Learning! 🎓**
