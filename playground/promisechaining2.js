require('../src/db/mongoose')
const TASK = require('../src/modals/tasks')

// TASK.findByIdAndDelete('5ebf92c2bd92d50610d6f192').then((task)=>{
//     console.log(task)
//     return TASK.countDocuments({iscompleted:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount =async(id)=>{
    const task=await TASK.findByIdAndDelete(id)
    const count = await TASK.countDocuments({iscompleted:false})
    return count
}

deleteTaskAndCount('5ec0f1bc509206294012327f').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})