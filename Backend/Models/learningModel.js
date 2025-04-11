import mongoose from "mongoose";

const LearningSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    completedTopics:[{
        type:String
    }],
    recommendedTopics: [{ 
        type: String 
    }],
    lastActivity: {
         type: Date, 
         default: Date.now 

    },

})

 const Leraning=mongoose.model("Learning",LearningSchema);
export default Leraning;