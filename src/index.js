const express=require('express')
require('./db/mongoose')
const USER=require('./modals/user')
const TASK=require('./modals/tasks')
const app= express()//creates application
const userRouter= require('./routers/user')
const taskRouter=require('./routers/task')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt=require('jsonwebtoken')

const myfunction = async()=>{
    const token=jwt.sign({_id:"ab1234"},'THISISMYNEWCOURSE',{expiresIn:'7 second'})
    console.log(token)

    const data=jwt.verify(token,'THISISMYNEWCOURSE')
    console.log(data)
}
myfunction()
app.listen(port,()=>{
    console.log('Server is up on port :' +port )
})