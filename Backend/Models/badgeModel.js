import mongoose from "mongoose";

const badgeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true,
    },
    criteria:{
        type:String,
        required:true,
    },

})

const Badge=mongoose.model("Badge",badgeSchema);
export default Badge;