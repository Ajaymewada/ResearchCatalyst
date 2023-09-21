const mongoose = require('mongoose');

// Define the schema for the "editorialboard" collection
const editorialBoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // You can store the image URL as a string
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String], // An array of strings
        required: true,
    },
});

// Create the EditorialBoard model
const EditorialBoard = mongoose.model('EditorialBoard', editorialBoardSchema);

module.exports = EditorialBoard;
