
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require("dotenv").config()
let users = [];
const signup = async(req  , res)=>{
    try{
        const{confirmPassword,...body} = req.body;
        if(body.password!== confirmPassword){
            return res.status(400).send({
                message : "password do not match"
            })}
    const existingUser = users.find((u)=>u.email===body.email)   
    if(existingUser){
        return res.status(409).send({
            message:"user already exist"
        })}  
        const hashedPassword = await bcrypt.hash(body.password ,10) 
        const newUser = {...body,
            password:hashedPassword,
            role,
           id:crypto.randomUUID(),}  
        users.push(newUser)
        return res.status(201).send({
            message:"user created successfuly"
        })
    }catch(error){
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}
const login=async(req , res)=>{
    try{
        const{email,password} = req.body;
        const user = users.find((u) => u.email === email);


        if(!user){
            return res.status(401).send({
                message:"User not found"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send({
                message:"Invalid credential"
            })
        }
        const token = jwt.sign({sub:user.id , email:user.email , role:user.role},process.env.JWT_KEY,{
            expiresIn:"3d",
        })
        return res.status(200).send({
            message:"Login successful",
            token: token
        })
    }catch(error){
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}
const checkUser = (req , res)=>{
    return res.status(200).send({
        message:"User is valid"
    })
}
module.exports={signup,login,checkUser}