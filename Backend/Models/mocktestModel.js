import mongoose from "mongoose";

const MockSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
       questions:[{
           question:String,
           options:[String],
           correctAnswer:String,
           userAnswer:String,
           explaination:String,
       }],
       score:Number,
       accuracy:Number,
       createdAt:{
        type:Date,
        default:Date.now
       }
})

const Mock=mongoose.model("Mock",MockSchema);
export default Mock;