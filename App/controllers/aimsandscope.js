const AimAndScope = require('../Modals/AimAndScopeModel'); // Replace with the correct path to your Mongoose model

async function saveAimAndScope(req, res) {
    try {
        const aimAndScopeData = req.body;
        const aimAndScope = await AimAndScope.findOneAndUpdate(
            {},
            aimAndScopeData,
            { upsert: true, new: true }
        )
        res.status(201).json({ message: 'Aim and scope created successfully', aimAndScope });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the aim and scope' });
    }
}

async function getAimsAndScope(req, res) {
    try {
        AimAndScope.findOne({}, (err, doc) => {
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
    saveAimAndScope,
    getAimsAndScope
};
