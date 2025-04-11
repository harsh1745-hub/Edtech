import mongoose from 'mongoose'

const VideoSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,
    },
    flashcards:{
        type:Array,
       
    },
    mindmap:{
        type:Object,
        
    }
},{timestamps:true});

const Video=mongoose.model("Video",VideoSchema);
export default Video;