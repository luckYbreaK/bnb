require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    session = require("express-session"),
    suites = require("./controllers/suites");
    


app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.session.user = {
            user: "",
            email: "",
            cart: []
        }
        console.log(req.session.user);
        
        next();
    }
});

// ENDPOINTS
app.get("/api/suites", suites.readSuites);


massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    
    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
