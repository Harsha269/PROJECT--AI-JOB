const mongoose = require("mongoose")
const interviewSchema = mongoose.Schema({
    job : {
        type :mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required : true
},
employer : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
applicant :{
    type : mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
scheduledAt :{
   type:Date ,
   required:true
},
status : {
    type:String,
    enum :["scheduled" , "completed" , "canceled"],
    default:"scheduled"
},
note : {
    type:String
}

},{timestamps :true })
module.exports = mongoose.model("interview" ,interviewSchema )