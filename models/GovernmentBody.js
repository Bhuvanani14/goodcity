const mongoose = require('mongoose');

// Government Body Schema
const governmentBodySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    contactInfo: {
        phone: String,
        email: String,
        website: String
    },
    jurisdiction: {
        type: String,
        enum: ['municipal', 'state', 'central', 'local'],
        default: 'municipal'
    },
    priority: {
        type: String,
        enum: ['primary', 'secondary', 'supporting'],
        default: 'primary'
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Index for efficient queries
governmentBodySchema.index({ category: 1, jurisdiction: 1 });

const GovernmentBody = mongoose.model('GovernmentBody', governmentBodySchema);

module.exports = GovernmentBody;
