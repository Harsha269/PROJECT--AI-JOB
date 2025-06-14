const mongoose = require('mongoose')
const educationSchema = mongoose.Schema({
    degree : String ,
    institution : String ,
    year : String,
})

const experienceSchema = mongoose.Schema({
    role : String ,
    company : String,
    year : String ,
})
 const resumeSchema = mongoose.Schema({
    user :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true ,
        // unique : true ,
    },
    fullName : String ,
    email : String ,
    phone : String ,
    summary : String ,
    education : [educationSchema],
    experience : [experienceSchema],
    skills : [String ], 
    highlights : [String] ,
    resumeFile : String , 
    



 },{timestamps : true })
 module.exports = mongoose.model("Resume" , resumeSchema)