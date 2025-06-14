const mongoose = require('mongoose')
const notificationSchema = mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    message : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    isRead : {
        type : Boolean,
        required : false,
    },
    createdAt : {
        type : Date ,
        default : Date.now
    },


})
module.exports = mongoose.model("Notification" ,notificationSchema)