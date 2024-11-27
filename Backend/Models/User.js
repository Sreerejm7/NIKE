const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  email:{
      type:String,
      require:true,
      unique:true
  },
  password:{
      type:String,
      require:true
  },
  role:{
      type:String,
      require:true,
      default:"User"
  },
  addresses:{
      type:[mongoose.Schema.Types.Mixed]
  },
  firstname:{
      type:String,
      require:true
  },
  lastname:{
      type:String,
      require:true
  },
  dateOfBirth:{
      type:Date,
      default:""
  },
  resetPasswordToken:{
      type:String,
      require:true
  }

},
{
  timestamps:true,
});


module.exports = mongoose.model("Users",userschema)