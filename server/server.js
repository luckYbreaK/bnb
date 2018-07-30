require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive");

app = express();

const {SERVER_PORT, CONNECTION_STRING} = process.env;

// MIDDLEWARE
app.use(bodyParser.json());

// ENDPOINTS

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    
    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
