const mongoose = require("mongoose")
const applicationSchema = mongoose.Schema({
    user : {
        type :mongoose.Schema.Types.ObjectId,
        ref:"user",
        required : true
},
job : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"job",
    required:true
},
status : {
    type:String,
    default:"pending"
},

},{timestamps :true })
module.exports = mongoose.model("application" ,applicationSchema )