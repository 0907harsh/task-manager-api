const express=require('express')
const USER=require('../modals/user')
//new router creation
const router = new express.Router()
router.post('/USERS',async (req,res)=>{
    const user=new USER(req.body)
    try{
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send('error')
    }
})

router.post('/USERS/login',async(req,res)=>{
    try{
        const user= await USER.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(202).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
})
router.get('/USERS',async(req,res)=>{
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
        const users=await USER.find({})
        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/USERS/:id',async (req,res)=>{
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

 router.patch('/USERS/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValid=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        // BYpasses middleware 
        // const user=await USER.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators :true})
        const user=await USER.findById(req.params.id)
        updates.forEach((update)=> user[update]=req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user) 
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/USERS/:id',async(req,res)=>{
    try{
        const user = await USER.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})



module.exports=router