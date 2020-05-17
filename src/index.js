const express=require('express')
require('./db/mongoose')
const USER=require('./modals/user')
const TASK=require('./modals/tasks')
const app= express()

const port = process.env.PORT || 3000

app.use(express.json())


app.post('/USERS',async (req,res)=>{
    const user=new USER(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send('error')
    }
})

app.get('/USERS',async(req,res)=>{
//    USER.exists({}).then(()=>{
//        USER.find({name:'ruchfi'}).then((users)=>{
//            res.send(users)
//        }).catch((e)=>{
//            res.status(500).send(e)
//        }).catch((e)=>{
//             res.send(e)
//        })
//    })
    try{
        const users=await USER.find({name:'ruchi'})
        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/USERS/:id',async (req,res)=>{
    const _id=req.params.id
    // USER.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
    try{
        const user = await USER.findById(_id)
        if(!user){
            return res.status(400).send(user)
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
 })



app.get('/TASKS',async(req,res)=>{
    // TASK.exists({}).then(()=>{
    //     TASK.find({iscompleted:true}).then((tasks)=>{
    //         if(tasks.length===0)
    //             return res.status(404).send(tasks)
    //         res.status(200).send(tasks)
    //     }).catch((e)=>{
    //         res.status(500).send(e)
    //     }).catch((e)=>{
    //          res.status(500).send(e)
    //     })
    // })
    try{
        const tasks=await TASK.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

app.get('/TASKS/:id',async(req,res)=>{
    const _id=req.params.id
    // TASK.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
    try{
        const task=await TASK.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})




app.post('/TASKS',async(req,res)=>{
    const task=new TASK(req.body)
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     console.log('error')
    //     res.status(400).send('error')
    // })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})





app.listen(port,()=>{
    console.log('Server is up on port :' +port )
})