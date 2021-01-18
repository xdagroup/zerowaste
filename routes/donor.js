var express = require('express');
var router = express.Router();
var donorHelper = require('../helpers/donor-helpers');
var acceptorHelper = require('../helpers/acceptor-helpers')

var donorMessage=""
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
router.get('/', verifyLogin, verifyRole, async (req, res, next)=> {
    let user = req.session.user

    res.render('donor/home', { user, donorMessage });
    donorMessage = ""
});
router.post('/addfood', verifyLogin, verifyRole, async (req, res, next)=> {
    let user = req.session.user._id
    req.body.user=user
    donorHelper.addFood(req.body).then(async(response) => {
        if (response.status) {
            let acceptorList = await acceptorHelper.getAcceptorList()
            donorHelper.sendEmail(acceptorList)
            donorMessage = "Food Added Successfully"
            res.redirect('/donor')
        }
    })
});
router.get('/list', verifyLogin, verifyRole, (req, res) => {
    let user = req.session.user._id
    donorHelper.getAllFood(user).then((response) => {
        console.log("Fetched All Food");
    
        res.render('donor/dashboard', { response });
    })
})

module.exports = router;
