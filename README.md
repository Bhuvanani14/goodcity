<<<<<<< HEAD
# Good City - Civic Issue Reporting & Tracking Application

A comprehensive web application for Indian citizens to report and track civic issues in their cities, with role-based access for both citizens and municipal administrators. Now deployed on Netlify with serverless functions!

## Features

### 🏙️ Core Features
- **Issue Reporting**: Indian citizens can report various civic issues with photos and location data
- **Real-time Tracking**: Track issue status from submission to resolution by municipal authorities
- **Role-based Access**: Separate interfaces for citizens and municipal administrators
- **AI Chatbot**: Interactive assistant for issue guidance and status queries with India-specific responses
- **Priority System**: Color-coded priority levels (low, moderate, urgent) based on Indian municipal standards
- **Community Voting**: Citizens can upvote issues to increase visibility
- **Analytics Dashboard**: Comprehensive insights for municipal administrators

### 🔐 Authentication System
- **User Login**: Indian citizens can log in to report and track issues
- **Admin Login**: Municipal administrators have access to management dashboard
- **JWT Tokens**: Secure token-based authentication for serverless environment
- **Role Verification**: Server-side role validation for protected routes

### 📊 Admin Dashboard
- **Issue Management**: View, filter, and update issue statuses across Indian cities
- **Analytics**: Real-time statistics and performance metrics for municipal operations
- **User Management**: Monitor active citizens and engagement levels
- **Reporting**: Generate detailed reports for municipal stakeholders

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

### Backend (Serverless)
- **Netlify Functions**: Serverless backend functions for Netlify deployment
- **Vercel Serverless Functions**: Alternative serverless backend for Vercel deployment
- **Node.js**: Server runtime environment
- **MongoDB Atlas**: Cloud database for data storage
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing and security

### Database
- **MongoDB Atlas**: Cloud-hosted document database
- **Connection String**: Configured via environment variables

## Deployment Options

### Option 1: Netlify Deployment (Recommended)

### Prerequisites
- Netlify account (free tier available)
- MongoDB Atlas account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Create database user with read/write permissions
   - Whitelist IP addresses (0.0.0.0/0 for development)

2. **Get Connection String**
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password

### Netlify Deployment Steps

1. **Connect Repository**
   - Push your code to Git repository
   - Connect repository to Netlify
   - Netlify will auto-detect the `netlify.toml` configuration

2. **Configure Environment Variables**
   - In Netlify dashboard, go to Site settings → Environment variables
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/good_city?retryWrites=true&w=majority
     JWT_SECRET=your-secure-jwt-secret-key-here
     ```

3. **Deploy**
   - Netlify will automatically build and deploy
   - Your site will be available at `https://your-site-name.netlify.app`

### Local Development with Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Set Environment Variables**
   ```bash
   # Create .env file in project root
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/good_city?retryWrites=true&w=majority
   JWT_SECRET=your-secure-jwt-secret-key-here
   ```

3. **Run Locally**
   ```bash
   npm run netlify
   ```
   - This starts Netlify Dev server with functions
   - Access at `http://localhost:8888`

### Option 2: Vercel Deployment (Alternative)

#### Prerequisites
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)
- Git repository

#### Vercel Deployment Steps

1. **Connect Repository**
   - Push your code to Git repository
   - Connect repository to Vercel
   - Vercel will auto-detect the `vercel.json` configuration

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Project settings → Environment Variables
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/good_city?retryWrites=true&w=majority
     JWT_SECRET=your-secure-jwt-secret-key-here
     ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be available at `https://your-project-name.vercel.app`

#### Local Development with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Set Environment Variables**
   ```bash
   # Create .env.local file in project root
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/good_city?retryWrites=true&w=majority
   JWT_SECRET=your-secure-jwt-secret-key-here
   ```

3. **Run Locally**
   ```bash
   vercel dev
   ```
   - This starts Vercel Dev server with functions
   - Access at `http://localhost:3000`

## Project Structure

```
good-city/
├── netlify.toml                    # Netlify configuration
├── vercel.json                     # Vercel configuration
├── netlify/
│   └── functions/                  # Netlify serverless functions
│       ├── auth-register.js        # User registration
│       ├── auth-login.js          # User login
│       ├── auth-logout.js         # User logout
│       ├── auth-me.js             # Get current user
│       ├── issues-get.js          # Get all issues
│       ├── issues-post.js         # Create new issue
│       ├── issues-get-id.js       # Get specific issue
│       ├── issues-put-id.js       # Update issue
│       ├── issues-vote.js         # Vote on issue
│       ├── my-issues.js           # Get user's issues
│       └── admin-stats.js         # Admin statistics
├── api/                           # Vercel serverless functions
│   ├── auth/
│   │   ├── register.js            # User registration (Vercel)
│   │   ├── login.js               # User login (Vercel)
│   │   ├── logout.js              # User logout (Vercel)
│   │   └── me.js                  # Get current user (Vercel)
│   ├── issues/
│   │   ├── index.js               # Issues CRUD (Vercel)
│   │   ├── [id].js                # Specific issue operations (Vercel)
│   │   └── vote.js                # Vote on issue (Vercel)
│   ├── my-issues.js               # Get user's issues (Vercel)
│   └── admin/
│       └── stats.js               # Admin statistics (Vercel)
├── utils/
│   └── db.js                      # Database connection utility
├── login.html                     # Authentication page
├── index.html                     # Main citizen dashboard
├── admin_dashboard.html           # Admin management interface
├── Infra.html                     # Infrastructure issues page
├── Public_Utilities.html          # Public utilities issues page
├── Safety_&_Law_Enforcement.html  # Safety issues page
├── sanitation.html                # Sanitation issues page
├── Civic_Amenities_&_Services.html # Civic amenities page
├── environment_&_public_spaces.html # Environment issues page
├── server.js                      # Legacy Express server (for reference)
├── package.json                   # Project dependencies
├── start.bat                      # Windows startup script
├── start.sh                       # Linux/Mac startup script
└── README.md                      # This file
```

## API Endpoints (Netlify Functions)

### Authentication
- `POST /.netlify/functions/auth-login` - User login
- `POST /.netlify/functions/auth-logout` - User logout
- `GET /.netlify/functions/auth-me` - Get current user info
- `POST /.netlify/functions/auth-register` - User registration

### Issues
- `GET /.netlify/functions/issues-get` - Get all issues (with filters)
- `POST /.netlify/functions/issues-post` - Create new issue
- `GET /.netlify/functions/issues-get-id?id=:id` - Get specific issue
- `PUT /.netlify/functions/issues-put-id?id=:id` - Update issue status
- `POST /.netlify/functions/issues-vote?id=:id` - Vote on issue
- `GET /.netlify/functions/my-issues` - Get user's reported issues

### Admin
- `GET /.netlify/functions/admin-stats` - Get admin statistics

## Environment Variables

Create a `.env` file in the project root for local development:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/good_city?retryWrites=true&w=majority
JWT_SECRET=your-secure-jwt-secret-key-here
```

For Netlify deployment, set these in the Netlify dashboard under Site settings → Environment variables.

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
- **Environment Variables**: Sensitive data stored securely
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation for all user inputs

## Database Seeding

To seed the database with demo data:

1. Update `seed.js` to use MongoDB Atlas connection string
2. Run: `node seed.js`

## Troubleshooting

### Common Issues
1. **Function Timeout**: Netlify functions have a 10-second timeout limit
2. **Cold Starts**: First function call may be slower due to cold starts
3. **MongoDB Connection**: Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
4. **Environment Variables**: Check that all required env vars are set in Netlify
5. **CORS Errors**: Ensure functions return proper CORS headers

### Debug Mode
- Use Netlify CLI for local debugging: `npm run netlify`
- Check Netlify function logs in the dashboard
- Enable debug logging in functions by adding console.log statements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with Netlify CLI
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demo application with dummy credentials. In a production environment, implement proper user registration, password policies, and additional security measures.
=======
# goodcity
Masai Hackathon
>>>>>>> 05b26482d649b493d6fc6fc7d618148baa916211
