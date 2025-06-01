const jwt = require("jsonwebtoken")
require("dotenv").config();

const Auth =(req , res, next)=>{
    try{
        const bearerToken = req.headers.authorization;
        if(!bearerToken)
            return res.status(401).send({
        message : "Unauthorized"
        })
        const[,token]=bearerToken.split(" ")[1];
        if(!token)
            return res.status(401).send({
        message:"Unauthorized"})
    
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) return res.status(401).send({ message: "Unauthorized" });

           req.user = decoded
        next();
     }catch(error){
        return res.status(401).send({
            message:"Unauthorized"
        })
     }

}
module.exports =Auth