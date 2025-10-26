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
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await connectToDatabase();

        const { id } = req.query;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Valid issue ID is required'
            });
        }

        if (req.method === 'GET') {
            // Get specific issue
            const issue = await Issue.findById(id)
                .populate('reporter', 'username email')
                .populate('assignedTo', 'username email');

            if (!issue) {
                return res.status(404).json({
                    success: false,
                    message: 'Issue not found'
                });
            }

            res.status(200).json({
                success: true,
                issue
            });

        } else if (req.method === 'PUT') {
            // Update issue - requires admin authentication
            authenticateToken(req, res, async () => {
                requireAdmin(req, res, async () => {
                    const { status, assignedTo, priority } = req.body;

                    const updateData = {
                        updatedAt: new Date()
                    };

                    if (status) {
                        updateData.status = status;
                        if (status === 'resolved') {
                            updateData.resolvedAt = new Date();
                        }
                    }

                    if (assignedTo) {
                        if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
                            return res.status(400).json({
                                success: false,
                                message: 'Invalid assigned user ID'
                            });
                        }
                        updateData.assignedTo = assignedTo;
                    }

                    if (priority) {
                        updateData.priority = priority;
                    }

                    const issue = await Issue.findByIdAndUpdate(
                        id,
                        updateData,
                        { new: true }
                    )
                    .populate('reporter', 'username email')
                    .populate('assignedTo', 'username email');

                    if (!issue) {
                        return res.status(404).json({
                            success: false,
                            message: 'Issue not found'
                        });
                    }

                    res.status(200).json({
                        success: true,
                        message: 'Issue updated successfully',
                        issue
                    });
                });
            });

        } else {
            res.status(405).json({ success: false, message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Issue API error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error processing request'
        });
    }
}
