const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../../utils/db');

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
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectToDatabase();

        // Authenticate user
        authenticateToken(req, res, async () => {
            const { issueId } = req.body;

            if (!issueId || !mongoose.Types.ObjectId.isValid(issueId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Valid issue ID is required'
                });
            }

            // Find and update the issue with increment vote
            const issue = await Issue.findByIdAndUpdate(
                issueId,
                { $inc: { votes: 1 } },
                { new: true }
            );

            if (!issue) {
                return res.status(404).json({
                    success: false,
                    message: 'Issue not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Vote recorded successfully',
                votes: issue.votes
            });
        });
    } catch (error) {
        console.error('Vote error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error processing vote'
        });
    }
}
