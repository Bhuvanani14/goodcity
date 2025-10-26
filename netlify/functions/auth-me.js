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

const User = mongoose.model('User', userSchema);

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
        await connectToDatabase();

        const userData = await User.findOne({ username: user.username });
        if (!userData) {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'User not found' })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userData._id,
                username: userData.username,
                role: userData.role,
                email: userData.email,
                lastLogin: userData.lastLogin
            })
        };
    } catch (error) {
        console.error('Auth error:', error);
        return {
            statusCode: error.message === 'Access token required' || error.message === 'Invalid token' ? 401 : 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: error.message || 'Server error' })
        };
    }
};
