const Chat = require("../models/chat.model")
const sendMessage = async(req , res)=>{
    try{
    const{from , to , text}=req.body;
    const newMessage = new Chat ({from ,to ,text}) 
    await newMessage.save()
    return res.status(200).send({
        message : "Message sent" ,
        data : newMessage
    })
    }catch(error){
        return res.status(500).send({
            message:" Failed to send Message  "
        })
    }


}
const getMessage = async(req,res)=>{
    const{from , to} = req.query
    try {
        const message =  await Chat.find({
            $or:
            [
                {from , to},
                {from : to , to:from}
            ]
        }).sort({timestamp : 1})
        res.send(message)
    } catch (error) {
        return res.status(500).send({
            message : "Failed to get message"
        })
        
    }

}
module.exports={sendMessage , getMessage}