const mongoose = require('mongoose');

// Define the schema for your model
const forAuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: [String], // Assuming keywords is an array of strings
    title: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create the 'forAuthorCollection' model
const forAuthorCollection = mongoose.model('forAuthorCollection', forAuthorSchema);

// Export the model for use in your application
module.exports = forAuthorCollection;
