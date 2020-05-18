const express=require('express')
const TASK=require('../modals/tasks')
//new router creation
const router = new express.Router()
router.get('/TASKS',async(req,res)=>{
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

router.get('/TASKS/:id',async(req,res)=>{
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




router.post('/TASKS',async(req,res)=>{
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


router.patch('/TASKS/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates = ['description','iscompleted']
    const isValid=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        // const task=await TASK.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators :true})
        const task=await TASK.findById(req.params.id)
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task) 
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/TASKS/:id',async(req,res)=>{
    try{
        const task = await TASK.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports=router