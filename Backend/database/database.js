const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://sreerejsree7:vvdVKGi5bATb4CMy@cluster0.dro1w.mongodb.net/NIKE')
.then(()=>{
  console.log("Database Connected Sucessfully");
  
})
.catch(()=>{
  console.log("Database Connection Failed");
  
})
