const mongoose=require('mongoose')


const schema=mongoose.Schema({
    movieTitle:{
        type:String,
        required:true,
        unique:true,
        
    },
    director:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    rating:{
        type:String,
        required:true

    },
    createdAt: {
        type: Date,
        default: Date.now()
      }

})
// export
module.exports=mongoose.model("movies",schema)