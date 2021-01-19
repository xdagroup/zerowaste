const { ObjectId } = require('mongodb')
const userModel = require('../database/user-model')
const foodModel = require('../database/food-model')

module.exports = {
    findUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userProfile = await userModel.findOne({ _id: ObjectId(userId) })
            resolve(userProfile)

        })
    },
    getLocation: () => {
        
    },
    getCount: () => {
        return new Promise(async (resolve, reject) => {
            var count = {}
            count.donor = await userModel.count({ role: "donor" })
            count.acceptor = await userModel.count({ role: "acceptor" })
            count.food = await foodModel.count()
            resolve(count)
        })
    }
    
}