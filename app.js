const exppress = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser")

const app = exppress()

app.use(cookieParser());

require("./DataBase/connect.js");

app.use(exppress.json());

app.use(require("./router/auth.js"));


// 3rd step heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}


app.listen(PORT, ()=>{
    console.log(`Listening to ${PORT}`);
})