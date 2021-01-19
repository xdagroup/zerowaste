const { ObjectId } = require('mongodb')
const userModel = require('../database/user-model')

module.exports = {
    findUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userProfile = await userModel.findOne({ _id: ObjectId(userId) })
            resolve(userProfile)

        })
    },
    getLocation: () => {
        
    }
    
}