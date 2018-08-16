require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    session = require("express-session"),
    cors = require("cors"),
    _ = require("lodash"),
    moment = require("moment"),
    suitesCtrl = require("./controllers/suites"),
    auth0Ctrl = require("./controllers/auth0"),
    stripeCtrl = require("./controllers/stripe"),
    cartCtrl = require("./controllers/cart"),
    usersCtrl = require("./controllers/users");

app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

// MIDDLEWARE
app.use( express.static( `${__dirname}/../build` ) );
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
app.post("/api/createOrder", (req, res) => {
    let { cart } = req.session.user;
    let suitesArr = cart.filter(item => item.startDate);
    //for a future expansion
    let packagesArr = cart.filter(item => !item.startDate);

    const db = req.app.get("db");
    if(suitesArr.length > 1) {
        suitesArr.forEach(suite => {
            db.orders.insert_into_orders([moment(), moment(suite.startDate).format("YYYY-MM-DD"), moment(suite.endDate).format("YYYY-MM-DD"), suite.total, req.session.user.id, suite.id])
                .then(res => {});
        });
        res.sendStatus(200);
    } else if(suitesArr.length === 1) {
        let { startDate, endDate, total, id} = suitesArr[0];
        db.orders.insert_into_orders([moment(), moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD"), total, req.session.user.id, id])
            .then(res => {});
        res.sendStatus(200);
    }

});
app.get("/api/userData", usersCtrl.readUserData);
app.get("/api/suites", suitesCtrl.readSuites);
app.get('/auth/callback', auth0Ctrl.auth0);
app.get('/api/logout', auth0Ctrl.logoutUser);
app.get("/api/getCart", cartCtrl.readCart);
app.get("/api/reservations/:id", async (req, res) => {
    const db = req.app.get("db");
    let responseWithUserOrders = await db.orders.select_orders_by_user([Number(req.params.id)]);
    res.status(200).send(responseWithUserOrders);
});
app.put("/api/updateItemInCart/:id", cartCtrl.updateCart);
app.put("/api/updateUserInfo/:id", async (req, res) => {
    let { firstName, lastName, email, phoneNumber } = req.body.user
    const db = req.app.get("db");
    await db.users.update_user_info([email, phoneNumber, firstName, lastName, Number(req.params.id)]);
    res.sendStatus(200);
});
app.delete("/api/deleteFromCart/:id", cartCtrl.deleteItem);
app.delete("/api/emptyCart", cartCtrl.deleteAllItems);

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);

    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
