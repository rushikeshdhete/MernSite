const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
.then(()=>{console.log("connected database")})
.catch((err)=>{console.log(err)});