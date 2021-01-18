const mongoose = require('mongoose');
const Schema = mongoose.Schema

var foodSchema = new mongoose.Schema({
    uid: {
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
    }
});
var foodModel = mongoose.model('Food', foodSchema)
module.exports = foodModel;
