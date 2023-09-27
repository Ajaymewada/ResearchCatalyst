const AddArticle = require('../Modals/addArticleModal');

// Function to save a new article
async function saveArticle(req, res) {
    try {
        let articleData = req.body;
        if (articleData && articleData.authorNames) {
            articleData.authorNames = JSON.parse(articleData.authorNames)
        }
        if (req.file) {
            articleData.pdffilepath = `artcilePDFFile/${req.file.filename}`
        }
        
        const newArticle = new AddArticle(articleData);

        // Save the new article to the database
        const savedArticle = await newArticle.save();

        // Respond with the saved article as JSON
        res.json(savedArticle);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error saving article:', error);
        res.status(500).json({ error: 'Failed to save article' });
    }
}

// Function to update an existing article by ID
async function updateArticle(req, res) {
    // console.log(req.body);
    const articleId = req.body._id;
    let updatequery = {
        title: req.body.title,
        abstract: req.body.abstract,
        citation: req.body.citation,
        authorNames: req.body.authorNames
    }
    try {
        const updatedArticle = await AddArticle.findByIdAndUpdate(
            articleId,
            updatequery,
            { new: true }
        );

        if (!updatedArticle) {
            // If the article with the given ID doesn't exist, send a 404 response
            return res.status(404).json({ error: 'Article not found' });
        }

        // Respond with the updated article as JSON
        res.json(updatedArticle);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error updating article:', error);
        res.status(500).json({ error: 'Failed to update article' });
    }
}

async function getAticles(req, res) {
    AddArticle.find({},(err, docs) => {
        if(err) {
            res.status(500).json({
                msg: "No docs Found!",
                status: false
            })
        } else {
            res.status(200).json({
                msg: "docs Found!",
                status: true,
                data: docs
            })
        }
    })
}

async function getArticlesPaginationWise(req, res) {
    try {
        const perPage = 5; // Number of documents to fetch per page
        const skip = (req.body.pageNumber - 1) * perPage; // Calculate the number of documents to skip

        // Use the "find" method to retrieve articles with pagination
        const articles = await AddArticle.find()
            .skip(skip)
            .limit(perPage);

        // Count the total number of articles (for pagination)
        const totalArticles = await AddArticle.countDocuments();
        if(articles) {
            res.status(200).json({
                articles,
                totalArticles,
                status: true
            })
        } else {
            res.status(500).json({
                status: false
            })
        }
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error fetching articles:', error);
        throw error;
    }
}

async function searchArticle(req, res) {
    // console.log(req.body.name);
    AddArticle.find({
        title: { $regex: new RegExp(req.body.name, 'i') }
    }, (err, doc) => {
        if (err) {
            res.status(500).json({
                msg: "No Data",
                status: false,
                articles: {}
            })
        } else {
            res.status(200).json({
                msg: "Data Found!",
                status: true,
                articles: doc
            })
        }
    })
}

// Export both functions for use in routes
module.exports = {
    saveArticle,
    updateArticle,
    getAticles,
    getArticlesPaginationWise,
    searchArticle
};
