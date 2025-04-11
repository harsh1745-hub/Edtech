import mongoose from "mongoose";

const PerfomanceSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    quizzesAttempted:{
        type:Number,
        default:0,
    },
  correctAnswers: { 
    type: Number, 
    default: 0 
},
  incorrectAnswers: { 
    type: Number, 
    default: 0 
},
  accuracy: { 
    type: Number, 
    default: 0 
}, 
  topicsMastered: [{ 
    type: String
 }], // List of topics where accuracy > 80%
  weakAreas: [{ type: String }], // Topics where accuracy < 50%
  studyTime: { type: Number, default: 0 }, // Total study time in minutes
  lastActivity: { type: Date, default: Date.now },
})

const Perfomance=mongoose.model("Perfomance",PerfomanceSchema);
export default Perfomance