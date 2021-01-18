var express = require('express');
var router = express.Router();
var acceptorHelper = require('../helpers/acceptor-helpers')

const verifyLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
}
const verifyRole = (req, res, next) => {
    if (req.session.user.role==="acceptor") {
        next()
    } else {
        res.redirect('/donor')
    }
}

router.get('/', verifyLogin,verifyRole, function (req, res, next) {
    let user = req.session.user
    acceptorHelper.getAllFood().then((response) => {
        res.render('acceptor/home', { user,response });
    })
    

    
});

module.exports = router;