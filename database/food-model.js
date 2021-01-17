const mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    uid: {
        type: String,
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
    }
});
var foodModel = mongoose.model('Food', foodSchema)
module.exports = foodModel;
