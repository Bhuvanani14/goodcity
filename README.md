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
   - Push your code to Git repository (GitHub, GitLab, or Bitbucket)
   - Go to [vercel.com](https://vercel.com) and sign in with your account
   - Click the **"New Project"** button or go to your dashboard and click **"Import Project"**
   - Import your repository from the connected Git provider
   - Vercel will auto-detect the `vercel.json` configuration

2. **Configure Project Settings**
   - **Framework Preset**: Select **"Other"** (since we're using custom serverless functions)
   - **Root Directory**: Leave as **`./`** (project root)
   - **Build Command**: Leave empty (no build needed for serverless functions)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install` (default)

3. **Configure Environment Variables**
   - In the project settings, click on the **"Environment Variables"** tab
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/good_city?retryWrites=true&w=majority
     JWT_SECRET=your-secure-jwt-secret-key-here
     ```
   - Set the **Environment** dropdown to apply to "Production", "Preview", and "Development"

4. **Deploy**
   - Click the **"Deploy"** button
   - Vercel will automatically build and deploy your functions
   - Wait for the deployment to complete (usually takes 1-3 minutes)
   - Your site will be available at `https://your-project-name.vercel.app`
   - Functions will be accessible at `https://your-project-name.vercel.app/api/*`

5. **Verify Deployment**
   - Visit your deployed site URL
   - Try logging in with demo credentials (`user` / `user@123`)
   - Check the Vercel dashboard under "Functions" tab to see your deployed functions

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
# Good City - Civic Issue Reporting & Tracking Application

A comprehensive web application for Indian citizens to report and track civic issues in their cities, with role-based access for both citizens and municipal administrators.

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
- **Session Management**: Secure session handling with 24-hour expiration
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

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework (original)
- **Netlify Functions**: Serverless backend for Netlify deployment
- **Vercel Functions**: Serverless backend for Vercel deployment
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing and security

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Connection String**: Configured via environment variables

## Deployment Options

### Option 1: Netlify Deployment (Recommended)

#### Prerequisites
- Netlify account
- MongoDB Atlas cluster

#### Steps
1. **Fork/Clone Repository**
   ```bash
   git clone <repository-url>
   cd good-city
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup MongoDB Atlas**
   - Create MongoDB Atlas account
   - Create a cluster
   - Get connection string
   - Create database named `improve_my_city`

4. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Configure build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string for JWT signing
   - Click "Deploy site"

5. **Seed Database** (Optional)
   ```bash
   node seed.js
   ```

#### Netlify Functions
The application uses Netlify Functions located in `netlify/functions/`:
- `auth-register.js` - User registration
- `auth-login.js` - User authentication
- `auth-logout.js` - User logout
- `auth-me.js` - Get current user info
- `issues-get.js` - Get all issues
- `issues-post.js` - Create new issue
- `issues-get-id.js` - Get specific issue
- `issues-put-id.js` - Update issue
- `issues-vote.js` - Vote on issue
- `my-issues.js` - Get user's issues
- `admin-stats.js` - Admin statistics

### Option 2: Vercel Deployment

#### Prerequisites
- Vercel account
- MongoDB Atlas cluster

#### Steps
1. **Fork/Clone Repository**
   ```bash
   git clone <repository-url>
   cd good-city
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup MongoDB Atlas**
   - Create MongoDB Atlas account
   - Create a cluster
   - Get connection string
   - Create database named `improve_my_city`

4. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure project:
     - Framework Preset: Other
     - Root Directory: `./`
     - Build Command: (leave empty)
     - Output Directory: `./`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string for JWT signing
   - Click "Deploy"

5. **Seed Database** (Optional)
   ```bash
   node seed.js
   ```

#### Vercel Functions
The application uses Vercel Functions located in `api/`:
- `api/auth/register.js` - User registration
- `api/auth/login.js` - User authentication
- `api/auth/logout.js` - User logout
- `api/auth/me.js` - Get current user info
- `api/issues/index.js` - Get all issues / Create issue
- `api/issues/[id].js` - Get/Update specific issue
- `api/issues/vote.js` - Vote on issue
- `api/my-issues.js` - Get user's issues
- `api/admin/stats.js` - Admin statistics

## Environment Variables

### Required for Both Platforms
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT token signing (use a long random string)

### Example
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/improve_my_city?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-here
```

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (for cloud database)
- npm or yarn package manager

### Setup
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd good-city
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/improve_my_city?retryWrites=true&w=majority
   JWT_SECRET=your-jwt-secret-key
   ```

4. **Run Locally**
   ```bash
   npm start
   ```

5. **Access Application**
   - Open browser to `http://localhost:3000`
   - Login with demo credentials

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Issues
- `GET /api/issues` - Get all issues (with optional category filter)
- `POST /api/issues` - Create new issue
- `GET /api/issues/:id` - Get specific issue
- `PUT /api/issues/:id` - Update issue (admin only)
- `POST /api/issues/vote` - Vote on issue

### User Issues
- `GET /api/my-issues` - Get user's reported issues

### Admin
- `GET /api/admin/stats` - Get admin statistics

## Usage Guide

### For Citizens
1. **Register/Login**: Create account or login with existing credentials
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
2. Add corresponding API endpoints in serverless functions
3. Update database schemas if needed
4. Test authentication and authorization

### Database Schema
- **Database**: `improve_my_city`
- **Users Collection**: username, password, role, email, timestamps
- **Issues Collection**: title, description, category, priority, status, location, reporter, votes, timestamps

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB Atlas connection string is correct
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
>>>>>>> 05b26482d649b493d6fc6fc7d618148baa916211
