require('../src/db/mongoose')
const USER = require('../src/modals/user')

// USER.findByIdAndUpdate('5ebfa0c36345d3220c437ebe',{age:0}).then((user)=>{
//     console.log(user)
//     return USER.countDocuments({age:0})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const updateAgeAndCount =async(id,age)=>{
    const user=await USER.findByIdAndUpdate(id,{age})
    const count = await USER.countDocuments({age})
    return count
}

updateAgeAndCount('5ebfa000c06b33670c934f58',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})



