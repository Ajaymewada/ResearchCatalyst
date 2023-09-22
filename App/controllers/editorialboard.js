var mongoose = require('mongoose');
const EditorialBoard = require('../Modals/editorialboardModel'); // Replace with the correct path to your Mongoose model

async function saveEditorialBoard(req, res) {
    try {
        let editorialBoardData = req.body;
        if (editorialBoardData && editorialBoardData.keywords) {
            editorialBoardData.keywords = JSON.parse(editorialBoardData.keywords)
        }
        if (req.file) {
            editorialBoardData.image = `editorsImages/${req.file.filename}`
        }
        const editorialBoard = await new EditorialBoard(editorialBoardData);
        await editorialBoard.save();
        res.status(201).json({ message: 'Editorial board created successfully', editorialBoard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the editorial board' });
    }
}

async function getEditorialBoard(req, res) {
    try {
        EditorialBoard.find({}, (err, doc) => {
            if (err) {
                res.status(500).json({
                    msg: "Data not found!",
                    status: false
                })
            } else {
                res.status(200).json({
                    msg: "Data found!",
                    data: doc,
                    status: true
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            msg: "Data not found!",
            status: false
        })
    }
}

async function updateEditorialBoard(req, res) {
    let querytoset = {
        name: req.body.name,
        affiliation: req.body.affiliation,
        biography: req.body.biography
    }
    EditorialBoard.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(req.body._id) }, querytoset, (err, doc) => {
        if (err) {
            res.status(500).json({
                msg: "Failed to Update!",
                status: false,
                data: {}
            })
        } else {
            res.status(200).json({
                msg: "Updated Successfully!",
                status: true,
                data: doc
            })
        }
    });
}

async function searcheditorialboard(req, res) {
    EditorialBoard.find({
        name: { $regex: new RegExp(req.body.name, 'i') }
    }, (err, doc) => {
        if (err) {
            res.status(500).json({
                msg: "No Data",
                status: false,
                data: {}
            })
        } else {
            res.status(200).json({
                msg: "Data Found!",
                status: true,
                data: doc
            })
        }
    })
}

module.exports = {
    saveEditorialBoard,
    getEditorialBoard,
    updateEditorialBoard,
    searcheditorialboard
};
