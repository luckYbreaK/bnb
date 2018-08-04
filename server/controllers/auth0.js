const { REACT_APP_AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, REACT_APP_AUTH0_DOMAIN } = process.env

module.exports = {
    loginUser: async (req, res) => {

        let payload = {
            client_id: REACT_APP_AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            code: req.body.code,
            grant_type: 'authorization code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }

        let responseWithToken = await axios.post(`https://${REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);

        let responseWithUserData = await axios.get(`https://${REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${responseWithToken.data.access_token}`);

        req.session.user = Object.assign({}, req.session.user, responseWithUserData.data);
        res.redirect("/");
    },

    logoutUser: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}