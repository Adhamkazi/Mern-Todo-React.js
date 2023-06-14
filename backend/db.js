require('dotenv').config();
const mongoose = require('mongoose');


const connection = mongoose.connect('mongodb+srv://adham:adham@cluster0.iq2zpvd.mongodb.net/merntodo?retryWrites=true&w=majority');
connection.then(() => {
    console.log("Connected to the MongoDB database");
}).catch((error) => {
    console.log("Error connecting to the database:", error.message);
});

module.exports = {
    connection
};
