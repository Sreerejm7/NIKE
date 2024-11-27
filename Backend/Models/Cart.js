const mongoose = require('mongoose')

const cartschema = new mongoose.Schema({
  quantity:{
    type:Number,
    default:1,
    require:true
  },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"Product"
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"User"
  },
  size:{
    type:mongoose.Schema.Types.Mixed,
    require:true
  },
  
})

module.exports = mongoose.model("Cart",cartschema)