const mongoose = require("mongoose");
const Keys= require('../config/keys')
const DB = Keys.MongoDB;

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
    
}).then(()=>console.log("connection is successfully done")).catch((error)=>console.log("error hai" + error.message))