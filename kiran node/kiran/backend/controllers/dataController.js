const Data = require('../models/Data');

exports.getAllData = async (req, res) => {
    try {
        const data = await Data.getAllData();
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
