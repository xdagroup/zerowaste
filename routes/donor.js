var express = require('express');
var router = express.Router();
var donorHelper = require('../helpers/donor-helpers');
var acceptorHelper = require('../helpers/acceptor-helpers')
// var formidable = require('formidable');
// var multer = require('multer');
// var upload = multer({ dest: 'public/food-images' });

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
    req.body.user = user
    // console.log("Files")
    // console.log(req.files)
    // upload.single('image')

    
    donorHelper.addFood(req.body).then(async(response) => {
        if (response.status) {
            // var form = new formidable.IncomingForm();
            // console.log("Form")
            // console.log(form)
            // form.parse(req, function (err, fields, files) {
            //     var oldpath = files.filetoupload.path;
            //     console.log("Old Path")
            //     console.log(oldpath)
            //     var newpath = './public/food-images/' + files.filetoupload.name;
            //     fs.rename(oldpath, newpath, function (err) {
            //         if (err) throw err;
            //         console.log('File uploaded and moved!');
            //         // res.end();
            //     });
            // })
            // console.log(req.files)
            let image = req.files.image
            console.log("ID"+response.id)
            image.mv('./public/food-images/' + response.id + '.jpg' , (err) => {
                if (!err) {
                    console.log("Upload Success")
                } else {
                    console.log(err);
                }
            })
            let acceptorList = await acceptorHelper.getAcceptorList()
            // donorHelper.sendEmail(acceptorList)
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
