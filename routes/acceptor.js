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

router.get('/', verifyLogin,verifyRole, async (req, res, next)=> {
    let user = req.session.user
    let uid = req.session.user._id
    var acceptedCount = await acceptorHelper.getAcceptedCount(uid)
    acceptorHelper.getAllFood().then((response) => {
        res.render('acceptor/home', { user,response,acceptedCount });
    })
});

router.get('/accept/:id', (req, res) => {
    let id = req.params.id
    let userId = req.session.user._id
    acceptorHelper.acceptFood(id, userId).then(() => {
        res.redirect('/acceptor')
        console.log('accepted')
    })
})
router.get('/list', verifyLogin, verifyRole, (req, res) => {
        let user = req.session.user._id
        acceptorHelper.getAllAcceptedFood(user).then((response) => {
            console.log("Fetched All Food");

            res.render('acceptor/dashboard', { response });
        })
    })
    


module.exports = router;