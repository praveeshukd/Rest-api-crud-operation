const express=require('express')
const router=express.Router()




const UserRouter=require('./user')
router.use('/user',UserRouter)

const moviesRouter=require('./movies')
router.use('/movies',moviesRouter)

router.get("/",(req,res)=>{
    console.log('working')
})



// export
module.exports=router