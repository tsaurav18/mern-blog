import mongoose from "mongoose"


const blogSchema= mongoose.Schema({
    title: String,
    description:String,  
    timestamp: String,
    img:{
        type: String
    }

})
//collection
export default mongoose.model('posts', blogSchema);