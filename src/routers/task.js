const express=require('express')
const TASK=require('../modals/tasks')
const auth=require('../middleware/auth')
//new router creation
const router = new express.Router()
router.get('/TASKS',auth,async(req,res)=>{
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
        // const tasks=await TASK.find({creatorId:req.user._id})
        // using populate below
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/TASKS/:id',auth,async(req,res)=>{
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
        const task=await TASK.findOne({_id,creatorId:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})




router.post('/TASKS',auth,async(req,res)=>{
    //const task=new TASK(req.body)
    const task=new TASK({
        ...req.body,
        creatorId:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


router.patch('/TASKS/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates = ['description','iscompleted']
    const isValid=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        // const task=await TASK.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators :true})
        const task=await TASK.findOne({_id:req.params.id,creatorId:req.user._id})

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.status(200).send(task) 
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/TASKS/:id',auth,async(req,res)=>{
    try{
        const task = await TASK.findOneAndDelete({_id:req.params.id,creatorId:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports=router