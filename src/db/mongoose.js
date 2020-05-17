const mongoose=require('mongoose')
const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-managar-api',{
    useNewUrlParser:true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify:false
})

//#################################################
// ###################################################
// const me=new USER({
//     name:'ruchi',age:43,
//     email:' 1977ruchigupta@gmail.com',
//     password:'         Ppassword       '
// })

// me.save().then((response)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('error',error)
// })



// const newTask=new task({
//     description:'To watch TV part 2'
// })

// newTask.save().then((response)=>{
//     console.log('New Task Added')
// }).catch((error)=>{
//     console.log(error)
// })