// CRUD cretate read update delete

const mongodb=require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID=mongodb.ObjectID


const connectionURL='mongodb://127.0.0.1:27017'
const databaseName ='task-manager'

// const id = new ObjectID()
// console.log(id.id)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)
MongoClient.connect(connectionURL,{useUnifiedTopology: true,useNewUrlParser: true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to services')
    }
    const db=client.db(databaseName)

    const updatePromise=db.collection('USERS').updateOne({
        _id:new ObjectID("5ebe6f070a15352fa4695c10")
    },{
        $set:{
            name:'Malya'
        }
    })
    
    updatePromise.then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})
