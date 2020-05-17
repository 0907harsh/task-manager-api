// CRUD cretate read update delete

const mongodb=require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID=mongodb.ObjectID


const connectionURL='mongodb://127.0.0.1:27017'
const databaseName ='task-manager'

const id = new ObjectID()
console.log(id.id)
console.log(id.getTimestamp())
console.log(id.toHexString().length)
MongoClient.connect(connectionURL,{useUnifiedTopology: true,useNewUrlParser: true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to services')
    }else{
       const db=client.db(databaseName)
    //    db.collection('USERS').findOne({ name:'Harsh',age:10},(error,user)=>{
    //     if(error){
    //         return console.log('Unale to connect ')
    //     }
    //     console.log(user)
    // })
    //    db.collection('USERS').insertOne({
    //         name:'Vikram',
    //         age:17
    //    },(error,result)=>{
    //        if(error)
    //             return console.log('Unable to insert user')
    //         console.log(result.ops)
    //    })
        // db.collection('users').insertMany([
        //     {
        //         name:'malya',
        //         age:10
        //     },
        //     {
        //         name:'ruchi',
        //         age:40
        //     }
        // ],(error,result)=>{
        //     if(error){
        //         return console.log('Unable to insert documnent')
        //     }
        //     console.log(result.ops)

        // })
        // db.collection('tasks').insertMany([
        //     {
        //         task_no:1,
        //         task:'Complete mongo-db secton',
        //         is_completed:false
        //     },
        //     {
        //         task_no:2,
        //         task:'Add new features to notes app',
        //         is_completed:true
        //     },
        //     {
        //         task_no:3,
        //         task:'Add new features to weather app',
        //         is_completed:true
        //     }
        // ],(error,result)=>{
        //     if(error){
        //         return console.log('Unable to insert documnent')
        //     }
        //     console.log(result.ops)
        // })
    }
})
