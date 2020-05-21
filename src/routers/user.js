const express=require('express')
const USER=require('../modals/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const {sendWelcomeEmail,DeleteAccounEmail}=require('../sendgrid/account')
const sharp=require('sharp')
//new router creation
const router = new express.Router()
router.post('/USERS',async (req,res)=>{
    const user=new USER(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
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


var uploads=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        // You can always pass an error if something goes wrong:
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please upload images'))
        }
        // To accept the file pass `true`, like so:
        cb(undefined, true)
        
        
    }
})
router.post('/USERS/me/avatars',auth,uploads.single('avatar'),async (req,res)=>{
    // req.user.avatar=req.file.buffer
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.status(202).send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/USERS/me/avatars',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/USERS/:id/avatars',async (req,res)=>{
    try{
        const user =await USER.findById(req.params.id)
        if(!user||!user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
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
        DeleteAccounEmail(req.user.email,req.user.name)
        await req.user.remove()
        res.send(req.user)
    } catch(e){
        res.status(500).send()
    }
})



module.exports=router