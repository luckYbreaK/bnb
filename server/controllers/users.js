module.exports = {
    readUserData: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send("Please login");
        }
    }
}