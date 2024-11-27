const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    colors: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
   
    stock: {
        type: Number,
        min: [0, "wrong min stock"],
        default: 0,
        required: true
    },
    rating: {
        type: Number,
        min: [0, "wrong min rating"],
        max: [5, "wrong max rating"],
        default: 0
    },
    origin: {
        type: String,
        required: true
    },
    
    image: {
        type: [String],
        required: true,
        
    },
    highlights: {
        type: [String],
        required: true
    },
    discountPrice: {
        type: Number
    }
}, {
    timestamps: true
});





module.exports = mongoose.model("Product", productschema); 

