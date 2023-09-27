var express = require('express');
var router = express.Router();
var adminauth = require('../App/controllers/adminauth')
var addjournal = require('../App/controllers/addjournal')
var addarticle = require('../App/controllers/artcleController')
var aimsandscope = require('../App/controllers/aimsandscope')
var editorialboard = require('../App/controllers/editorialboard')
var instructions = require('../App/controllers/instructions')
var processingcharge = require('../App/controllers/processingcharge')
const multer = require('multer');
var authMiddleware = require('../App/middleware/auth')
const BlacklistedToken = require("../App/Modals/blacklistedToken");


router.get('/', function (req, res) {
    res.render('index');
})
router.get('/admin', authMiddleware, function (req, res) {
    res.render('AddJournal');
})
router.get('/article', authMiddleware, function (req, res) {
    res.render('Article');
})

router.get('/manage-article', authMiddleware, function (req, res) {
    res.render('ArticleManage');
})

router.get('/coverbanner', authMiddleware, function (req, res) {
    res.render('coverBanner');
})

router.get('/aimsscope', authMiddleware, function (req, res) {
    res.render('AimsAndScope');
})

router.get('/editorialboard', authMiddleware, function (req, res) {
    res.render('EditorialBoard');
})

router.get('/instructions', authMiddleware, function (req, res) {
    res.render('Instructions');
})

router.get('/proccessing-charge', authMiddleware, function (req, res) {
    res.render('Charge');
}) 

router.get('/usefull-links', authMiddleware, function (req, res) {
    res.render('useFullLinks');
})

router.get('/foreditors', authMiddleware, function (req, res) {
    res.render('ForEditor');
})

router.get('/forreviewers', authMiddleware, function (req, res) {
    res.render('ForReviewer');
})

router.get('/aims-and-scope', function (req, res) {
    res.render('Main-AimsScope');
})

router.get('/editorial-board', function (req, res) {
    res.render('MainEditorialBoard');
})

router.get('/editors-management', authMiddleware, function (req, res) {
    res.render('EditorsManagement');
})

router.get('/author-guide', function (req, res) {
    res.render('MainAuthorGuide');
})

router.get('/article-processing-fee', function (req, res) {
    res.render('MainProcessingFee');
})

router.get('/editorial-office', function (req, res) {
    res.render('MainContactUs');
})

// LOADS ADMIN LOGIN PAGE
router.get('/authlogin', function (req, res) {
    res.render('Auth-Login');
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/coverbannerImage/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/editorsImages/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload2 = multer({
    storage: storage2
})

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/artcilePDFFile/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload3 = multer({
    storage: storage3
})

router.post('/adminregister', adminauth.registerAdmin);
router.post('/adminlogin', adminauth.loginAdmin);
router.post('/addjournal', addjournal.saveJournal);
router.post('/aimsandscope', aimsandscope.saveAimAndScope);
router.post('/processingcharge', processingcharge.saveProcessingCharge);
router.post('/editorialboard', upload2.single("files"), editorialboard.saveEditorialBoard);
router.post('/editorialboardupdate', editorialboard.updateEditorialBoard);
router.post('/searcheditorialboard', editorialboard.searcheditorialboard);
router.post('/instructionsforauthor', instructions.saveInstructionsForAuthor);
router.post('/uploadCoverBanner', upload.single("files"), addjournal.savecoverbanner);
router.get('/getcoverbanner', addjournal.getcoverbanner)
router.get('/getjournal', addjournal.getJournal); 
router.get('/getaims-and-scope', aimsandscope.getAimsAndScope);
router.get('/getEditorialBoard', editorialboard.getEditorialBoard);
router.get('/getInstructionsForAuthor', instructions.getInstructionsForAuthor);
router.get('/getProcessingCharge', processingcharge.getProcessingCharge);

// Article Related Link Start
router.post('/addsaveArticle', upload3.single("files"), addarticle.saveArticle);
router.post('/addupdateArticle', addarticle.updateArticle);
router.get('/getAllArticle', addarticle.getAticles);
router.post('/getArticlesPaginationWise', addarticle.getArticlesPaginationWise);
router.post('/searchArticle', addarticle.searchArticle);
// Article Related Link End

// Logout route
router.post('/logout', async (req, res) => {
    try {
        const { token } = req.body;
        
        // Clear previous blacklisted tokens
        await BlacklistedToken.deleteMany({});

        // Add the token to the blacklist
        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// const { MongoClient } = require('mongodb');
// let username = "ajay";
// let password = "fg1egReBjVIUfWyY";
// let dbname = "ResearchCatalyst";
// router.get('/getjournal',(req,res) => {
//     console.log("csdvcjhdsgcsdvh");
    
// })

module.exports = router