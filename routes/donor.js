var express = require('express');
var router = express.Router();
const verifyLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
}
const verifyRole = (req, res, next) => {
    if (req.session.user.role === "donor") {
        next()
    } else {
        res.redirect('/acceptor')
    }
}
router.get('/', verifyLogin, verifyRole, function (req, res, next) {
    let user = req.session.user
    res.render('donor/home',{user});
});

module.exports = router;
