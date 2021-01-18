const foodModel = require('../database/food-model')
const userModel = require('../database/user-model')

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
                        localField: "uid",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "user"// output array field
                    }
                }], (error, data) => {
                    console.log(data)
            })

            resolve(foodList)
        })
    }
}