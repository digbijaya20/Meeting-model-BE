const mongoose = require('mongoose')

const MeetingSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    organisedBy: {
        type:String,
        required:true
    },
    topic: {
        type:String,
        required:true
    },
    meetingUrl: {
        type:String,
        required:true
    },
    password: {
        type:String,
    },
    date: {
        type:String,
        default: "20-10-2020"
    }
    
    
})

module.exports = mongoose.model('meeting',MeetingSchema)