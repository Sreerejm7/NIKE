const mongoose = require('mongoose')

const favouriteschema = new mongoose.Schema({
  quantity:{
    type:Number,
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
    type:String,
    require:true
  },
})

module.exports = mongoose.model('Favourite',favouriteschema)