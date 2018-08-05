module.exports = {
    readUserData: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            req.session.user = {
                cart: []
            }
            res.status(200).send(req.session.user)
        }
    }
}