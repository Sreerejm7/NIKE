const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
    },
    name: {
        type: {
            firstname: {
                type: String,
                require: true,
            },
            lastname: {
                type: String,
                require: true,
            }
        }},
    phone:{
        type:Number,
        require:true
    },
    alternativenumber:{
        type:Number
    },
    email:{
        type:String,
        require:true
    } , 
    address:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    Subtotal:{
        type:Number
    },
    delivery_charge:{
        type:Number
    },
    total:{
        type:Number
    },
    products:[{
        product:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Product',
         require:true
        },
        quantity:{
            type: Number,
            require:true
        },
        size:{
            type:mongoose.Schema.Types.Mixed,
            require:true
        },
        status:{
            type:String,
            default:'Dispatching'
        },
    }],
    orderdate:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('Order',orderSchema)