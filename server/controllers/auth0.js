const axios = require("axios");

const { REACT_APP_AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, REACT_APP_AUTH0_DOMAIN } = process.env;

module.exports = {
    auth0: async (req, res) => {
        
        let payload = {
            client_id: REACT_APP_AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        };
    
        //exchange code in the payload object for a token
        let responseWithToken = await axios.post(`https://${REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    
        //exchange the token from the respons above for user data
        let responseWithUserData = await axios.get(`https://${REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${responseWithToken.data.access_token}`);
    
        req.session.user = Object.assign({}, req.session.user, responseWithUserData.data);
        let cart = req.session.cart;
        let pathname = `/#${req.session.prevPath}`;
        res.redirect(pathname);
    },

    loginUser: (req, res) => {
        let {pathname, cart} = req.body;
        req.session.prevPath = pathname;
        req.session.cart = cart;
        res.sendStatus(200);
    },

    logoutUser: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}