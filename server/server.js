require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    session = require("express-session"),
    cors = require("cors"),
    suitesCtrl = require("./controllers/suites"),
    auth0Ctrl = require("./controllers/auth0"),
    stripeCtrl = require("./controllers/stripe"),
    usersCtrl = require("./controllers/users");

app = express();


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
// app.use((req, res, next) => {
//     if (req.session.user) {
//         next();
//     } else {
//         req.session.user = {
//             cart: []
//         }
//         console.log(req.session.user);

//         next();
//     }
// });

// ENDPOINTS
app.get("/api/userData", usersCtrl.readUserData);
app.get("/api/suites", suitesCtrl.readSuites);
app.get('/auth/callback', auth0Ctrl.loginUser);
app.get('/api/logout', auth0Ctrl.logoutUser);
app.post('/api/payment', stripeCtrl.charge);

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);

    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
