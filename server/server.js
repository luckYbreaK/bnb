require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive");

app = express();

const {SERVER_PORT} = process.env;

// MIDDLEWARE
app.use(bodyParser.json());

// ENDPOINTS

app.listen(SERVER_PORT, () => {
    console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
})