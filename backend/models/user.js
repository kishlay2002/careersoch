var mongoose= require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Keys= require("../config/keys");
const keysecret= Keys.JWTwebKey;
const userschema = mongoose.Schema({
    application_id :{
        type: String
    },
    first_name:{
        type: String,
        required: true
    },
    last_name : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    cpassword :{
        type : String,
        required : true
    },
    status : {
        type:String
    },
    email : {
        type : String,
        required : true
    },
    recruiter_flag : {
        type : Number
    },
    student_flag : {
        type : Number
    },
    address : {
        type : String,
    },
    state : {
        type : String,

    },
    city : {
        type : String
    },
    country : {
      type : String
    },
    zip_code : {
        type : String
    },
    company : {
      type : String
    },
    experience : {
        type : Number
    },
    education : {
        type : String
    },
    school : {
      type : String
    },
    skills : {
        type : String
    },
    profile_summary : {
        type : String
    },
    headline : {
      type : String
    },
    job_title : {
      type : String
    },
    profile_img : {
        type : String
    },
    workexperience : {
      type: Array
    },
    educationDetails : {
      type: Array
    },
    connections:[
        {
            email:String,
            first_name:String,
            last_name:String,
            job_title:String,
            experience:Number,
        }
    ],
    pending:[{
        email:String,
        first_name:String,
        last_name:String,
        job_title:String,
    }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    waiting:[
    ],

    
    resume_path: {type : Array, required : false},
    saved_job : {type : Array, required : false},
    applied_job:{type : Array, required : false}

});
// password hasing 
userschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 12);
        this.cpassword = bcrypt.hashSync(this.cpassword, 12);
    }
    next();
});
// generting token
userschema.methods.generatAuthtoken = async function(){
    try {
        let token = jwt.sign({ _id:this._id},keysecret,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}
const User= mongoose.model('User',userschema);
module.exports.User= User;