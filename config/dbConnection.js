const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection;