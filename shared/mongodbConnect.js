const mongoose=require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/user", { useNewUrlParser: true }).then(()=>{
    console.log('mongodb connected')
}).catch((err)=>{
    console.log(err)
})
