const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productShema = new Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    inCart: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Products',productShema);