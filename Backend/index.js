const express = require('express')
const app = express()
require ('dotenv').config()
const cors = require('cors')
const mongoose = require('./database/database.js')
const { route } = require('./routes/routes.js')
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(expressFileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',  
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


app.use('/',route)



const port = process.env.PORT

app.listen(port,()=>{
  console.log(`Server is Running on PORT ${port}`);
  
})

