const express=require('express')
require('./db/mongoose')
const USER=require('./modals/user')
const TASK=require('./modals/tasks')
const app= express()//creates application
const userRouter= require('./routers/user')
const taskRouter=require('./routers/task')
const port = process.env.PORT || 3000

//express middleware
// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send('GET request disabled')
//     } else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     if(req.method){
//         res.status(503).send('Servers under maintainence')
//     }else{
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt=require('jsonwebtoken')

const myfunction = async()=>{
    const token=jwt.sign({_id:"ab1234"},'THISISMYNEWCOURSE',{expiresIn:'7 second'})

    const data=jwt.verify(token,'THISISMYNEWCOURSE')
}
myfunction()
app.listen(port,()=>{
    console.log('Server is up on port :' +port )
})



/////////////POPULATE and VIRTUAL In Mongoose
// const main=async()=>{
//     // const task = await TASK.findById('5ec3d53395a33616f80d79e7')
//     // await task.populate('creatorId').execPopulate()
//     // console.log(task.creatorId)
//     const user = await USER.findById('5ec3d51195a33616f80d79e5')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()