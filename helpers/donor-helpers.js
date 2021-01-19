const foodModel = require('../database/food-model')
var nodemailer = require('nodemailer');

module.exports = {
    addFood: (userData)=>{
        return new Promise(async (resolve, reject) => {
            await foodModel.create({ donorId: userData.user, totalFoodCooked: userData.totalFoodCooked, foodWasteQty: userData.foodWasteQty, pickUpTime: userData.pickUpTime}).then((data) => {
                console.log("Returned Data")
                console.log(data._id)
                resolve({ status: true,id:data._id })
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
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
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
    },
    getFoodDetails: (id) => {
        return new Promise(async (resolve, reject) => {
            let food = await foodModel.findOne({ _id: id })
            resolve(food)
        })
    },
    updateFood: (foodId, foodDetails) => {
        return new Promise((resolve, reject) => {
            foodModel.updateOne({ _id: foodId }, {
                $set: {
                    totalFoodCooked: foodDetails.totalFoodCooked,
                    foodWasteQty: foodDetails.foodWasteQty,
                    pickUpTime: foodDetails.pickUpTime
                }
            }).then((response) => {
                resolve(response)
            })
        })

    }
}