const mongoose=require('mongoose')
const validator=require('validator')

const TASK=mongoose.model('Tasks',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    iscompleted:{
        type: Boolean,
        trim:true,
        default:false
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'USERS'
    }
})

module.exports = TASK