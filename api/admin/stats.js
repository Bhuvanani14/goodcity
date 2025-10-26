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
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
};

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Authenticate and require admin
        authenticateToken(req, res, async () => {
            requireAdmin(req, res, async () => {
                await connectToDatabase();

                const category = req.query.category;
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

                res.status(200).json({
                    totalIssues,
                    resolvedIssues,
                    urgentIssues,
                    inProgressIssues,
                    activeUsers,
                    avgResponseTime: avgResponseTime[0]?.avgResponseTime || 0
                });
            });
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching admin stats'
        });
    }
}
