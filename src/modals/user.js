const mongoose=require('mongoose')
const validator=require('validator')

const USER=mongoose.model('USERS',{
    name:{
        type: String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
         trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('\'Password\' cannot be use as password')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be > 0')
            }
        }
    }
})

module.exports = USER
