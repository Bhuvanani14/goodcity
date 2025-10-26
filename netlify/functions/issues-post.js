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

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
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

        await connectToDatabase();

        const { title, description, category, priority, location, images } = JSON.parse(event.body);

        const issue = new Issue({
            title,
            description,
            category,
            priority,
            location,
            images: images || [],
            reporter: user.id
        });

        await issue.save();
        await issue.populate('reporter', 'username');

        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issue)
        };
    } catch (error) {
        console.error('Error creating issue:', error);
        return {
            statusCode: error.message === 'Access token required' || error.message === 'Invalid token' ? 401 : 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: error.message || 'Error creating issue' })
        };
    }
};
