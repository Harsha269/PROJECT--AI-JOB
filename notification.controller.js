const Notification = require("../models/notification.model")
const  createNotification = async(req , res)=>{
    try {
        const{userId ,message , type} = req.body;
        const newNotification = new Notification({userId , message , type})
        await newNotification.save()
        return res.status(201).send({
            message:"Notification created",
            data : newNotification
        })

 } catch (error) {
    console.log(error);
    
    return res.status(500).send({
        message :"Failed to create notification"
    })
        
    }
}
const getNotification = async(req , res)=>{
    try {
        const {userId} = req.params
        const notification = await Notification.find({userId}).sort({createdAt:-1})
        return res.send(notification)
    } catch (error) {
        return res.status(500).send({
            message : "Failed to get notification"
        })
        
    }
}

const markAsRead = async(req , res)=>{
    try {
        const {id} = req.params;
          await Notification.findByIdAndUpdate(id ,{isRead : true})
        return res.status(200).send({
            message : "Mark as read"
        })
        
    } catch (error) {
        return res.status(500).send({
            message : "Failed to mark as notification"
        })
        
    }

}
module.exports = {createNotification , getNotification , markAsRead} 