const foodModel = require('../database/food-model')
var nodemailer = require('nodemailer');

module.exports = {
    addFood: (userData)=>{
        return new Promise(async (resolve, reject) => {
            await foodModel.create({ donorId: userData.user, totalFoodCooked: userData.totalFoodCooked, foodWasteQty: userData.foodWasteQty, pickUpTime: userData.pickUpTime}).then((data) => {
                resolve({ status: true })
            })
        })
    },
    getAllFood: (user) => {
        return new Promise(async (resolve, reject) => {
            let foodList = await foodModel.find({ donorId: user })
           
            resolve(foodList)
        })
    },
    sendEmail: (acceptorData) => {
        let mailList=''
        for (user in acceptorData) {
            mailList=mailList+acceptorData[user].email+','
            
        }
     
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'healthbotgh014@gmail.com',
                pass: '6238348643'
            }
        });

        var mailOptions = {
            from: 'healthbotgh014@gmail.com',
            to: mailList,
            subject: 'Donor Added Food',
            text: 'Hey New Food Added!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}