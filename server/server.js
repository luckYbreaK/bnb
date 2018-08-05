require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    session = require("express-session"),
    cors = require("cors"),
    axios = require("axios"),
    stripe = require("stripe")(process.env.SECRET_KEY),
    suites = require("./controllers/suites"),
    auth0 = require("./controllers/auth0"),
    users = require("./controllers/users");



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
app.get("/api/userData", users.readUserData);
app.get("/api/suites", suites.readSuites);
app.get('/auth/callback', async (req, res) => {
    console.log(req.query);
    
    let payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };

    //exchange code in the payload object for a token
    let responseWithToken = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);

    //exchange the token from the respons above for user data
    let responseWithUserData = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${responseWithToken.data.access_token}`);

    req.session.user = Object.assign({}, req.session.user, responseWithUserData.data);
    res.redirect('/suites');
});
app.get('/api/logout', auth0.logoutUser);
app.post('/api/payment', function (req, res, next) {
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
        if (amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
                pennies.push(amountArray[i + 1]);
            } else {
                pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
                pennies.push(amountArray[i + 2]);
            } else {
                pennies.push("0");
            }
            break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmt = parseInt(pennies.join(''));

    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function (err, charge) {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
});

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);

    app.listen(SERVER_PORT, () => {
        console.log(`Blimey, matey, heave ho on port: ${SERVER_PORT}`);
    })
})
