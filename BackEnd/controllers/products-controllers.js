const data = require('../api/kitchen_home_api.json');

const api_products = async (req, res) => {
    try {
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { api_products };
