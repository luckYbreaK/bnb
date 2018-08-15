require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    session = require("express-session"),
    cors = require("cors"),
    _ = require("lodash"),
    suitesCtrl = require("./controllers/suites"),
    auth0Ctrl = require("./controllers/auth0"),
    stripeCtrl = require("./controllers/stripe"),
    cartCtrl = require("./controllers/cart"),
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
app.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.session.user = {
            cart: []
        }
        next();
    }
});

// ENDPOINTS
app.post('/api/payment', stripeCtrl.charge);
app.post("/api/login", auth0Ctrl.loginUser);
app.post("/api/addToCart", cartCtrl.createItem);
app.get("/api/userData", usersCtrl.readUserData);
app.get("/api/suites", suitesCtrl.readSuites);
app.get('/auth/callback', auth0Ctrl.auth0);
app.get('/api/logout', auth0Ctrl.logoutUser);
app.get("/api/getCart", cartCtrl.readCart);
app.put("/api/updateItemInCart/:id", cartCtrl.updateCart);
app.delete("/api/deleteFromCart/:id", cartCtrl.deleteItem);
app.delete("/api/emptyCart", cartCtrl.deleteAllItems);

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);

    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
