const mongoose = require('mongoose');

// Define the schema for the "AddArticle" collection
const addArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authorNames: {
        type: [String],
        required: true,
    },
    abstract: {
        type: String,
        required: true,
    },
    citation: {
        type: String,
        required: true,
    },
    pdffilepath: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // This option adds createdAt and updatedAt fields
});

// Create the AddArticle model
const AddArticle = mongoose.model('AddArticle', addArticleSchema);

module.exports = AddArticle;
