const jwt=require('jsonwebtoken')
const USER=require('../modals/user')


const auth = async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const ismatch=jwt.verify(token,process.env.JWT_SECRET)
        const user=await USER.findOne({_id:ismatch._id,'tokens.token':token})
        if(!user){
            throw new Error('New error')
        }
        req.token=token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }
    
}

module.exports= auth