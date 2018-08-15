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
app.get("/api/userData", usersCtrl.readUserData);
app.get("/api/suites", suitesCtrl.readSuites);
app.get('/auth/callback', auth0Ctrl.auth0);
app.get('/api/logout', auth0Ctrl.logoutUser);
app.get("/api/getCart", (req, res) => {
    res.status(200).send(req.session.user.cart);
})
// Update later to add to db
// app.post("/api/cart", (req, res) => {
//     console.log("req.body",req.body.suite);

//     req.session.user.cart.push(req.body.suite)
//     console.log("req.session", req.session.user.cart);

//     res.status(200).send(req.session.user.cart);
// })
app.post('/api/payment', stripeCtrl.charge);
app.post("/api/login", auth0Ctrl.loginUser);
app.post("/api/addToCart", (req, res) => {
    req.session.user.cart.push(req.body.suite)
    res.status(200).send(req.session.user.cart);
});
app.put("/api/updateItemInCart/:id", (req, res) => {
    let { startDate, endDate, total } = req.body.suite
    let index = _.findIndex(req.session.user.cart, ['id', Number(req.params.id)])
    if (index !== -1) {
        req.session.user.cart[index].startDate = startDate;
        req.session.user.cart[index].endDate = endDate;
        req.session.user.cart[index].total = total;
    }
    res.status(200).send(req.session.user.cart);
});
app.delete("/api/deleteFromCart/:id", (req, res) => {
    let index = _.findIndex(req.session.user.cart, ['id', Number(req.params.id)])
    if (index !== -1) {
        req.session.user.cart.splice(index, 1);
    }
    res.status(200).send(req.session.user.cart);
});
app.delete("/api/emptyCart", (req, res) => {
    req.session.user.cart = [];
    res.status(200).send(req.session.user.cart);
})

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);

    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
