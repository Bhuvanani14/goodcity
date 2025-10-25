const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Session configuration
app.use(session({
    secret: 'improve-my-city-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/login_credentials'
    }),
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/login_credentials', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB - login_credentials database');
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true }
});

// Issue Schema
const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ['low', 'moderate', 'urgent'], default: 'moderate' },
    status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' },
    location: { type: String, required: true },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    votes: { type: Number, default: 0 },
    images: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date }
});

const User = mongoose.model('User', userSchema);
const Issue = mongoose.model('Issue', issueSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, 'improve-my-city-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Routes

// Registration route
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validation
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // First check demo credentials
        const demoCredentials = {
            user: { username: 'user', password: 'user@123' },
            admin: { username: 'admin', password: 'admin@123' }
        };

        const expectedCreds = demoCredentials[role];
        let user = null;

        if (username === expectedCreds.username && password === expectedCreds.password) {
            // Demo user login
            user = await User.findOne({ username });
            if (!user) {
                // Create demo user if doesn't exist
                user = new User({
                    username,
                    password: await bcrypt.hash(password, 10),
                    role,
                    email: `${username}@demo.com`
                });
                await user.save();
            }
        } else {
            // Check database for registered users
            user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            // Check role if specified
            if (role && user.role !== role) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid role for this user'
                });
            }
        }

        // Generate token
        const token = jwt.sign(
            { username: user.username, role: user.role, id: user._id },
            'improve-my-city-secret-key',
            { expiresIn: '24h' }
        );

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Set session
        req.session.userId = user._id;
        req.session.role = user.role;

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// Logout route
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            lastLogin: user.lastLogin
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Issues routes
app.get('/api/issues', async (req, res) => {
    try {
        const { category, priority, status, limit = 50 } = req.query;
        const filter = {};
        
        if (category) filter.category = category;
        if (priority) filter.priority = priority;
        if (status) filter.status = status;

        const issues = await Issue.find(filter)
            .populate('reporter', 'username')
            .populate('assignedTo', 'username')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching issues' });
    }
});

app.post('/api/issues', authenticateToken, async (req, res) => {
    try {
        const { title, description, category, priority, location, images } = req.body;
        
        const issue = new Issue({
            title,
            description,
            category,
            priority,
            location,
            images: images || [],
            reporter: req.user.id
        });

        await issue.save();
        await issue.populate('reporter', 'username');

        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({ message: 'Error creating issue' });
    }
});

app.put('/api/issues/:id', authenticateToken, async (req, res) => {
    try {
        const { status, assignedTo } = req.body;
        const issue = await Issue.findById(req.params.id);
        
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        if (status) issue.status = status;
        if (assignedTo) issue.assignedTo = assignedTo;
        if (status === 'resolved') issue.resolvedAt = new Date();
        
        issue.updatedAt = new Date();
        await issue.save();

        res.json(issue);
    } catch (error) {
        res.status(500).json({ message: 'Error updating issue' });
    }
});

// Vote on issue
app.post('/api/issues/:id/vote', authenticateToken, async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        issue.votes += 1;
        await issue.save();

        res.json({ votes: issue.votes });
    } catch (error) {
        res.status(500).json({ message: 'Error voting on issue' });
    }
});

// Admin routes
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const totalIssues = await Issue.countDocuments();
        const resolvedIssues = await Issue.countDocuments({ status: 'resolved' });
        const urgentIssues = await Issue.countDocuments({ priority: 'urgent' });
        const activeUsers = await User.countDocuments({ isActive: true });

        const avgResponseTime = await Issue.aggregate([
            { $match: { status: 'resolved', resolvedAt: { $exists: true } } },
            {
                $project: {
                    responseTime: {
                        $divide: [
                            { $subtract: ['$resolvedAt', '$createdAt'] },
                            1000 * 60 * 60 * 24 // Convert to days
                        ]
                    }
                }
            },
            { $group: { _id: null, avgResponseTime: { $avg: '$responseTime' } } }
        ]);

        res.json({
            totalIssues,
            resolvedIssues,
            urgentIssues,
            activeUsers,
            avgResponseTime: avgResponseTime[0]?.avgResponseTime || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin stats' });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});
