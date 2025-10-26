const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Use environment variable for MongoDB URI, fallback to local for backward compatibility
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/improve_my_city';

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB for seeding.');

        // Clear existing data
        await User.deleteMany({});
        await Issue.deleteMany({});
        console.log('Cleared existing users and issues.');

        // Create dummy users
        const hashedPasswordUser = await bcrypt.hash('user@123', 10);
        const hashedPasswordAdmin = await bcrypt.hash('admin@123', 10);

        const user1 = new User({
            username: 'user',
            email: 'user@example.com',
            password: hashedPasswordUser,
            role: 'user',
            lastLogin: new Date()
        });

        const admin1 = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPasswordAdmin,
            role: 'admin',
            lastLogin: new Date()
        });

        await user1.save();
        await admin1.save();
        console.log('Dummy users created.');

        // Create dummy issues
        const issues = [
            {
                title: 'Pothole on Main Street',
                description: 'A large pothole near the intersection of Main Street and First Avenue is causing traffic hazards.',
                category: 'infrastructure',
                priority: 'urgent',
                status: 'pending',
                location: 'Main Street, near First Avenue',
                reporter: user1._id,
                votes: 5,
                images: ['https://example.com/pothole1.jpg']
            },
            {
                title: 'Overflowing Garbage Bin',
                description: 'The public garbage bin near the park entrance is overflowing, attracting pests.',
                category: 'sanitation',
                priority: 'moderate',
                status: 'in_progress',
                location: 'City Park, near main entrance',
                reporter: user1._id,
                assignedTo: admin1._id,
                votes: 10,
                images: ['https://example.com/garbage1.jpg'],
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
            },
            {
                title: 'Broken Streetlight',
                description: 'The streetlight outside building C is not working, making the area dark and unsafe at night.',
                category: 'public_utilities',
                priority: 'urgent',
                status: 'resolved',
                location: 'Building C, Elm Street',
                reporter: user1._id,
                assignedTo: admin1._id,
                votes: 8,
                images: ['https://example.com/streetlight1.jpg'],
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
            },
            {
                title: 'Illegal Dumping in Forest Area',
                description: 'Someone has dumped construction waste in the protected forest area behind the industrial zone.',
                category: 'environment',
                priority: 'urgent',
                status: 'pending',
                location: 'Forest area behind Industrial Zone',
                reporter: user1._id,
                votes: 15,
                images: ['https://example.com/dumping1.jpg']
            },
            {
                title: 'Damaged Public Bench',
                description: 'A bench in the central plaza is broken and needs repair.',
                category: 'civic',
                priority: 'low',
                status: 'pending',
                location: 'Central Plaza',
                reporter: user1._id,
                votes: 3
            },
            {
                title: 'Suspicious Activity in Alley',
                description: 'Frequent suspicious gatherings in the alley behind the market after dark.',
                category: 'safety',
                priority: 'urgent',
                status: 'pending',
                location: 'Alley behind Central Market',
                reporter: user1._id,
                votes: 7
            }
        ];

        await Issue.insertMany(issues);
        console.log('Dummy issues created.');

        console.log('Database seeding complete!');
    } catch (error) {
        console.error('Database seeding failed:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

// To run this script, you need to export User and Issue models from server.js
// For example, at the end of server.js:
// module.exports = { User, Issue };

seedDatabase();
