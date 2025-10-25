# Improve My City - Civic Issue Reporting & Tracking Application

A comprehensive web application for citizens to report and track civic issues in their communities, with role-based access for both citizens and administrators.

## Features

### 🏙️ Core Features
- **Issue Reporting**: Citizens can report various civic issues with photos and location data
- **Real-time Tracking**: Track issue status from submission to resolution
- **Role-based Access**: Separate interfaces for citizens and administrators
- **AI Chatbot**: Interactive assistant for issue guidance and status queries
- **Priority System**: Color-coded priority levels (low, moderate, urgent)
- **Community Voting**: Citizens can upvote issues to increase visibility
- **Analytics Dashboard**: Comprehensive insights for administrators

### 🔐 Authentication System
- **User Login**: Citizens can log in to report and track issues
- **Admin Login**: Administrators have access to management dashboard
- **Session Management**: Secure session handling with 24-hour expiration
- **Role Verification**: Server-side role validation for protected routes

### 📊 Admin Dashboard
- **Issue Management**: View, filter, and update issue statuses
- **Analytics**: Real-time statistics and performance metrics
- **User Management**: Monitor active users and engagement
- **Reporting**: Generate detailed reports for stakeholders

## Demo Credentials

### Citizen Account
- **Username**: `user`
- **Password**: `user@123`

### Admin Account
- **Username**: `admin`
- **Password**: `admin@123`

## Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Dynamic functionality and API integration
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing and security

### Database
- **MongoDB**: Document-based database
- **Connection String**: `mongodb://localhost:27017/`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

### Installation Steps

1. **Clone or Download** the project files to your local machine

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   - Ensure MongoDB is running on `mongodb://localhost:27017/`
   - The application will automatically create the database `login_credentials`

4. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - You'll be redirected to the login page
   - Use the demo credentials to access the application

## Project Structure

```
improve-my-city/
├── login.html              # Authentication page
├── index.html              # Main citizen dashboard
├── admin_dashboard.html    # Admin management interface
├── Infra.html             # Infrastructure issues page
├── Public_Utilities.html  # Public utilities issues page
├── Safety_&_Law_Enforcement.html # Safety issues page
├── sanitation.html        # Sanitation issues page
├── Civic_Amenities_&_Services.html # Civic amenities page
├── environment_&_public_spaces.html # Environment issues page
├── server.js              # Node.js backend server
├── package.json           # Project dependencies
└── README.md              # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Issues
- `GET /api/issues` - Get all issues (with filters)
- `POST /api/issues` - Create new issue
- `PUT /api/issues/:id` - Update issue status
- `POST /api/issues/:id/vote` - Vote on issue

### Admin
- `GET /api/admin/stats` - Get admin statistics

## Usage Guide

### For Citizens
1. **Login**: Use citizen credentials (`user` / `user@123`)
2. **Report Issues**: Navigate to category pages to report specific issues
3. **Track Progress**: Monitor your reported issues and their status
4. **Vote**: Upvote important issues in your community
5. **Chat**: Use the AI chatbot for guidance and status queries

### For Administrators
1. **Login**: Use admin credentials (`admin` / `admin@123`)
2. **Dashboard**: Access comprehensive analytics and management tools
3. **Issue Management**: Update issue statuses and assign resources
4. **Analytics**: Monitor performance metrics and trends
5. **Reporting**: Generate reports for stakeholders

## Security Features

- **Password Hashing**: All passwords are securely hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Server-side session handling
- **Role Validation**: Server-side role verification for all protected routes
- **Input Validation**: Server-side validation for all user inputs

## Development

### Adding New Features
1. Update the frontend HTML/CSS/JavaScript files
2. Add corresponding API endpoints in `server.js`
3. Update database schemas if needed
4. Test authentication and authorization

### Database Schema
- **Database**: `login_credentials`
- **Users Collection**: username, password, role, email, timestamps
- **Issues Collection**: title, description, category, priority, status, location, reporter, votes, timestamps
- **Sessions Collection**: session data for user authentication

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running on localhost:27017
2. **Port Already in Use**: Change the PORT in server.js or kill the process using port 3000
3. **Authentication Issues**: Clear browser localStorage and try logging in again
4. **CORS Errors**: Ensure the server is running and accessible

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demo application with dummy credentials. In a production environment, implement proper user registration, password policies, and additional security measures.
