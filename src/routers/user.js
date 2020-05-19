const express=require('express')
const USER=require('../modals/user')
const auth=require('../middleware/auth')
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
        res.status(500).send({error:'Unable to Login'})
    }
})

router.post('/USERS/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })
        await req.user.save()
        res.status(202).send({success:'Logged Out Successfully'})
    }catch(e){
        res.status(500).send('errrrrrrrr')
    }
})

router.post('/USERS/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(202).send({success:'Logged Out Of all Sessions Successfully'})
    }catch(e){
        res.status(500).send('errrrrrrrr')
    }
})


router.get('/USERS/me',auth,async(req,res)=>{
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
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/USERS/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValid=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        // BYpasses middleware 
        // const user=await USER.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators :true})
        updates.forEach((update)=> req.user[update]=req.body[update])
        await req.user.save()
        res.status(200).send(req.user) 
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/USERS/me',auth,async(req,res)=>{
    try{
        // const user = await USER.findByIdAndDelete(req.user._id)
        await req.user.remove()
        res.send(req.user)
    } catch(e){
        res.status(500).send()
    }
})



module.exports=router