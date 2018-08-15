const _ = require("lodash");

module.exports = {
    createItem: (req, res) => {
        req.session.user.cart.push(req.body.suite)
        res.status(200).send(req.session.user.cart);
    },
    readCart: (req, res) => {
        res.status(200).send(req.session.user.cart);
    },
    updateCart: (req, res) => {
        let { startDate, endDate, total } = req.body.suite
        let index = _.findIndex(req.session.user.cart, ['id', Number(req.params.id)])
        if (index !== -1) {
            req.session.user.cart[index].startDate = startDate;
            req.session.user.cart[index].endDate = endDate;
            req.session.user.cart[index].total = total;
        }
        res.status(200).send(req.session.user.cart);
    },
    deleteItem: (req, res) => {
        let index = _.findIndex(req.session.user.cart, ['id', Number(req.params.id)])
        if (index !== -1) {
            req.session.user.cart.splice(index, 1);
        }
        res.status(200).send(req.session.user.cart);
    },
    deleteAllItems: (req, res) => {
        req.session.user.cart = [];
        res.status(200).send(req.session.user.cart);
    }   
}