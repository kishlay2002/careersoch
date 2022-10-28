//require("dotenv").config();
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5007;
const path = require('path');
const router= require("./routes/router");
require("./db/conn");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.listen(port,()=>{
    console.log(`your server is running on port ${port} `);
});