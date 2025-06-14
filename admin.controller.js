const Job = require('../models/user.model')
const User = require('../models/job.model')
const Resume = require('../models/resume.model')
const Chat = require('../models/chat.model')
const Notification = require('../models/notification.model')
const getAllUsers= async(req , res)=>{
    try{
    const users = await User.find()
  return  res.status(200).send(users)
}catch(error){
    return res.status(500).send({
        message :error.message
    })
}
}
const deleteUsers = async (req , res)=>{
    try{
        const {id} = req.params
     await User.findByIdAndDelete(id)
    return res.status(200).send({
        message : "User deleted"
    })

}catch(error){
    return res.status(500).send({
        message : error.message
    })
}
}
const getAllJobs= async (req , res)=>{
    try{
    const jobs = await Job.find()
   return res.status(200).send(jobs)
}catch(error){
    return res.status(500).send({
        message : error.message
    })
}
}
const deleteJobs = async (req , res)=>{
try {
    const jobId = req.params.id
    const job = await Job.findByIdAndDelete(jobId)
    if(!job){
        return res.status(404).send({
            message : "Job not found"
        })
    }
    return res.status(200).send({
        message : "Job deleted successfuly"
    })
} catch (error) {
    return res.status(500).send({
        message : "server error"
    })
    
}
   

}
const getAllResume = async(req, res)=>{
    try{
    const resume = await Resume.find()
    res.status(200).send(resume)
}catch(error){
    return res.status(500).send({
        message : error.message
    })
}
}
const getAllNotification = async(req , res)=>{
    const notifications = await Notification.find();
    res.send(notifications)
}

const createNotification = async(req , res)=>{
    const{title , message} = req.body;
    const notification = new Notification({title , message ,createdAt : new Date()})
    await notification.save()
    return res.status(200).send({
        message :"Notification sent"
    })

}
const getAnalytics = async(req , res)=>{
    const totalUsers = await User.countDocuments()
    const totalJobs = await Job.countDocuments()
    const totalresumes = await Resume.countDocuments()
    res.send({totalUsers , totalJobs , totalresumes})
}

const getAdminChat = async(req , res)=>{
    const chat = await Chat.find()
    res.send(chat)

}
const sendAdminMessage = async(req , res)=>{
    try {
        // const{recipientId , message} = req.body
        // const senderId = req.userId
        console.log("incoming body :" ,req.body);
        const{from ,to,text}=req.body
        
        // if(!recipientId || !message){
        if(!from || !to || !text){
            return res.status(404).send({
                message : "Missing recipient or message"
            })
        }
        const chat = await Chat.create({from ,to ,text})
        return res.status(201).send({
            message : "Message sent" ,
            data : chat
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({
            message: "server error"
        })
        }}


module.exports = {
 getAllUsers , deleteUsers ,getAllJobs , deleteJobs ,
getAllResume , getAllNotification ,createNotification ,getAnalytics , getAdminChat ,sendAdminMessage
}