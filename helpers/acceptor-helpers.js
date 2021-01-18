const foodModel = require('../database/food-model')
const userModel = require('../database/user-model')
var objectId = require('mongodb').ObjectID
module.exports = {
    getAllFood: () => {
        return new Promise(async (resolve, reject) => {
            let foodList = await foodModel.aggregate([
            //     {
            //     $group:
            //     {
            //         _id: "$uid",
            //         totalFoodCooked: { $first: "totalFoodCooked"}
            //     }
            // },
                {
                    $lookup: {
                        from: "users", // collection to join
                        localField: "donorId",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "user"// output array field
                    }
                }], (error, data) => {
                    console.log(data)
            })

            resolve(foodList)
        })
    },
    getAcceptorList: () => {
        return new Promise(async (resolve, reject) => {
            let mailList = await userModel.find({ role: "acceptor" })
            resolve(mailList)
        })
    },
    acceptFood: (foodId,userId) => {
        return new Promise(async (resolve, reject) => {
            await foodModel.updateOne({ _id: objectId(foodId)}, {
                $set: {
                    status: 'Accepted',
                    acceptorId: userId
                    
                }
            }).then((response) => {
                resolve(response)
            })
        })
    },
    getAllAcceptedFood: (user) => {
        return new Promise(async (resolve, reject) => {
            let foodList = await foodModel.find({ acceptorId: user })

            resolve(foodList)
        })
    }
}