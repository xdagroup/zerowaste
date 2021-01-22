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
        type: String,
        required: true
    },
    status: {
        type:String
    },
    acceptorId: {
        type: Schema.Types.ObjectId
    },
    address: {
        type:String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});
var foodModel = mongoose.model('Food', foodSchema)
module.exports = foodModel;
