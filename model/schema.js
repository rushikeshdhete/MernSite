const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        require:true
    },
    phone : {
        type: Number,
        required : true
    },
    work : {
        type : String,
        require:true
    },
    password : {
        type: String,
        required : true
    },
    cpassword : {
        type : String,
        require:true
    },
    tokens : [
        {
            token:{
                type : String,
                require:true
            }
        }
    ],

    messages : [
        {
        name : {
            type: String,
            required : true
        },
        email : {
            type : String,
            require:true
        },
        phone : {
            type: Number,
            required : true
        },
        
        message : {
            type : String,
            required : true,
        }
    }
    ],

    date:{
        type: Date,
        default:new Date().toLocaleDateString()
    }

});





// HASHING PASSWORD

Schema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password =  await bcrypt.hash(this.password, 12);
        this.cpassword =  await bcrypt.hash(this.cpassword, 12);
    }
    next();
});


// GENERATING TOKEN

Schema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

Schema.methods.addMsg = async function(name, email, phone , message){
    try{
        this.messages = this.messages.concat({name, email, phone , message});
        await this.save;
        return this.messages;
    }catch (err){
        console.log(err);
    }
}




const User = mongoose.model("USER", Schema);
module.exports= User;