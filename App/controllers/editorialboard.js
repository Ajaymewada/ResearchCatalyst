const EditorialBoard = require('../Modals/editorialboardModel'); // Replace with the correct path to your Mongoose model

async function saveEditorialBoard(req, res) {
    try {
        let editorialBoardData = req.body;
        if (editorialBoardData && editorialBoardData.keywords) {
            editorialBoardData.keywords = JSON.parse(editorialBoardData.keywords)
        }
        if(req.file){
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

module.exports = {
    saveEditorialBoard,
    getEditorialBoard
};
