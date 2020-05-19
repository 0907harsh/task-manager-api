const mongoose=require('mongoose')
const validator=require('validator')

const taskSchema= new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    iscompleted:{
        type: Boolean,
        trim:true,
        default:true
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'USERS'
    }
},{
    timestamps:true
})

const TASK=mongoose.model('Tasks',taskSchema)

module.exports = TASK