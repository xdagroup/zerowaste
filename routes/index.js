var express = require('express');
var router = express.Router();
var loginHelper = require('../helpers/login-helpers')
var userHelper = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  console.log(user)
  res.render('index');
});
router.get('/login', function (req, res, next) {
  if (req.session.loggedIn) {
    if(req.session.user.role==="donor")
      res.redirect('/donor')
    else
      res.redirect('/acceptor')
  } else
    res.render('login', { loginErr: req.session.loginErr })
  req.session.loginErr = false
});
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.post('/signup', async (req, res) => {
  loginHelper.doSignup(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.data
      if (req.session.user.role === "donor")
        res.redirect('/donor')
      else
        res.redirect('/acceptor')

    } 
     
     else {
      req.session.loginErr = "User already registered. Please Login"
      res.redirect('/login')
    }
    
  })
})
router.post('/login', async (req, res) => {
  // console.log(req.body)
  loginHelper.doLogin(req.body).then((response) => {
    
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      if (req.session.user.role === "donor")
        res.redirect('/donor')
      else
        res.redirect('/acceptor')
    } else {
      req.session.loginErr = "Invalid Username or password"
      res.redirect('/login')
    }
  })
})
// router.get('/home', verifyLogin,(req, res) => {
//   let user=req.session.user
//   res.render("success",{user})
// })
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
router.get('/profile/:id', (req, res) => {
  let userId = req.params.id
  userHelper.findUser(userId).then((response) => {
    
    res.render('profile',{response})
  })
  
})
module.exports = router;
