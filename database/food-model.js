const mongoose = require('mongoose');
const Schema = mongoose.Schema

var foodSchema = new mongoose.Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    totalFoodCooked: {
        type: String,
        required: true
    },
    foodWasteQty: {
        type: String,
        required: true
    },
    pickUpTime: {
        type: Date,
        required: true
    },
    status: {
        type:String
    },
    acceptorId: {
        type: Schema.Types.ObjectId
    }
});
var foodModel = mongoose.model('Food', foodSchema)
module.exports = foodModel;
