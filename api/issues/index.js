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

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await connectToDatabase();

        if (req.method === 'GET') {
            // Get all issues with optional filtering
            const { category, priority, status, page = 1, limit = 10 } = req.query;

            let filter = {};
            if (category) filter.category = category;
            if (priority) filter.priority = priority;
            if (status) filter.status = status;

            const issues = await Issue.find(filter)
                .populate('reporter', 'username')
                .populate('assignedTo', 'username')
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit);

            const total = await Issue.countDocuments(filter);

            res.status(200).json({
                success: true,
                issues,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalIssues: total,
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            });

        } else if (req.method === 'POST') {
            // Create new issue - requires authentication
            authenticateToken(req, res, async () => {
                const { title, description, category, priority, location, images } = req.body;

                if (!title || !description || !category || !location) {
                    return res.status(400).json({
                        success: false,
                        message: 'Title, description, category, and location are required'
                    });
                }

                const issue = new Issue({
                    title,
                    description,
                    category,
                    priority: priority || 'moderate',
                    location,
                    reporter: req.user.id,
                    images: images || []
                });

                await issue.save();

                const populatedIssue = await Issue.findById(issue._id)
                    .populate('reporter', 'username')
                    .populate('assignedTo', 'username');

                res.status(201).json({
                    success: true,
                    message: 'Issue created successfully',
                    issue: populatedIssue
                });
            });
        } else {
            res.status(405).json({ success: false, message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Issues API error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error processing request'
        });
    }
}
