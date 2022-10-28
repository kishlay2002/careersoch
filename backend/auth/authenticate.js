// const jwt= require("jsonwebtoken");
// const User= require("../models/user");
// const Keys= require("../config/keys");
// const keysecret= Keys.JWTwebKey;
// const authenticate= async(req,res,next)=>{
//     try{
//         const token= req.body.servertoken||req.headers['servertoken'];
//         const verifyTooken= jwt.verify(token,keysecret);
//         const rootUser= await User.findOne({_id:verifyTooken._id,"tokens.token":token});
//         if(!rootUser){
//             throw new Error("User Not Found")
//         }
//         req.token
//     }
// }