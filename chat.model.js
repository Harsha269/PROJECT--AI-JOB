const mongoose = require('mongoose')
const chatSchema = mongoose.Schema({
    from :{
        type :mongoose.Schema.Types.ObjectId,
        ref:"user" ,
        required :true
    },
    to : {
         type :mongoose.Schema.Types.ObjectId,
         ref:"user" ,
        required :true

    },
    text : {
         type :String,
        required :true
    },
    createdAt : {
        type :Date ,
        default :Date.now

    } ,
    timestamp:{
        type:Date,
        default:Date.now
    },

})
module.exports = mongoose.model("chat" ,chatSchema)