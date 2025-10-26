const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../../utils/db');

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
const authenticateToken = (token) => {
    if (!token) {
        throw new Error('Access token required');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'good-city-secret-key');
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

// Admin middleware
const requireAdmin = (user) => {
    if (user.role !== 'admin') {
        throw new Error('Admin access required');
    }
};

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const authHeader = event.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const user = authenticateToken(token);
        requireAdmin(user);

        await connectToDatabase();

        const category = event.queryStringParameters?.category;
        const filter = category ? { category } : {};

        const totalIssues = await Issue.countDocuments(filter);
        const resolvedIssues = await Issue.countDocuments({ ...filter, status: 'resolved' });
        const urgentIssues = await Issue.countDocuments({ ...filter, priority: 'urgent' });
        const inProgressIssues = await Issue.countDocuments({ ...filter, status: 'in_progress' });
        const activeUsers = await User.countDocuments({ isActive: true });

        const avgResponseTime = await Issue.aggregate([
            { $match: { status: 'resolved', resolvedAt: { $exists: true }, ...filter } },
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

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                totalIssues,
                resolvedIssues,
                urgentIssues,
                inProgressIssues,
                activeUsers,
                avgResponseTime: avgResponseTime[0]?.avgResponseTime || 0
            })
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return {
            statusCode: error.message === 'Access token required' || error.message === 'Invalid token' || error.message === 'Admin access required' ? 401 : 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: error.message || 'Error fetching admin stats' })
        };
    }
};
