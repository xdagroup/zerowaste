const foodModel = require('../database/food-model')

module.exports = {
    addFood: (userData)=>{
        return new Promise(async (resolve, reject) => {
            await foodModel.create({ uid: userData.user, totalFoodCooked: userData.totalFoodCooked, foodWasteQty: userData.foodWasteQty, pickUpTime: userData.pickUpTime }).then((data) => {
                resolve({ status: true })
            })
        })
    }
}