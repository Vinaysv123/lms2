# Learning Management System (LMS)

A production-ready Learning Management System built with Node.js, Express, SQLite, and vanilla JavaScript. This project is designed for GitHub, resume, and interview purposes.

## 🎯 Project Overview

A complete LMS platform that allows:
- **Students** to register, login, browse courses, enroll, and track progress
- **Admins** to create courses, manage content, and view student enrollments
- Secure JWT-based authentication with bcrypt password hashing
- Clean MVC architecture with proper separation of concerns

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

## 📁 Project Structure

```
lms-project/
├── backend/
│   ├── server.js              # Server entry point
│   ├── app.js                 # Express app configuration
│   ├── routes/
│   │   ├── auth.routes.js     # Authentication endpoints
│   │   ├── course.routes.js   # Course CRUD endpoints
│   │   └── enrollment.routes.js  # Enrollment endpoints
│   ├── controllers/
│   │   ├── auth.controller.js    # Auth logic
│   │   ├── course.controller.js  # Course logic
│   │   └── enrollment.controller.js  # Enrollment logic
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── error.middleware.js   # Error handling
│   ├── db/
│   │   └── init-db.js       # Database initialization
│   ├── utils/
│   │   └── validation.js    # Input validation & password hashing
│   └── .env.example         # Environment variables template
│
├── frontend/
│   ├── index.html           # Home page
│   ├── login.html           # Login/Register page
│   ├── dashboard.html       # Student/Admin dashboard
│   ├── courses.html         # Courses listing page
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   └── js/
│       ├── api.js           # API client
│       └── utils.js         # Utility functions
│
├── package.json             # Dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
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

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lms-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and change the JWT_SECRET:
```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

4. **Start the server**
```bash
npm start
```

The server will run on `http://localhost:5000`

### Development Mode
```bash
npm run dev
```

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

### Create Test Admin User
1. Register a user normally
2. Manually update the role in database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### Test Flow
1. **Student**: Register → Login → View Courses → Enroll → Dashboard
2. **Admin**: Login → Create Course → View Enrollments → Manage Courses

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

## 👨‍💻 Author

Built as a production-ready LMS template for GitHub, resume, and interview purposes.

---

**Happy Learning! 🎓**
