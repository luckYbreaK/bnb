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

        const db = req.app.get("db");

        let responseIsExistingUser = await db.users.select_user([req.session.user.email]);
        if (responseIsExistingUser.length > 0) {
            req.session.user.id = responseIsExistingUser[0].id;
            let updates = {};
            updates.username = req.session.user.nickname;
            if (req.session.user.name.includes(" ")) {
                updates.firstName = req.session.user.name.match(/^\w+/)[0];
                updates.lastName = req.session.user.name.match(/\w+$/)[0];
            } else {
                updates.firstName = null;
                updates.lastName = null;
            }

            await db.users.update_user([updates.username, updates.firstName, updates.lastName, req.session.user.email]);
        } else {
            let { nickname, email, name } = req.session.user;
            let firstName = null, lastName = null;
            if (name.includes(" ")) {
                firstName = req.session.user.name.match(/^\w+/)[0];
                lastName = req.session.user.name.match(/\w+$/)[0];
            }
            let responseWithNewUser = await db.users.insert_user([nickname, email, firstName, lastName]);
            req.session.user.id = responseWithNewUser[0].id;
        }


        let pathname = `/#${req.session.prevPath}`;
        res.redirect(pathname);
    },

    loginUser: (req, res) => {
        let { pathname } = req.body;
        req.session.prevPath = pathname;
        res.sendStatus(200);
    },

    logoutUser: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}