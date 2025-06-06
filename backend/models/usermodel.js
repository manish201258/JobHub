import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,  // Ensure phone numbers are unique
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // url for resume file
        resumeOriginalName:{type:String}, // resume link pe filename ke liye 
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},  // company name through id  of company model
        profilePhoto:{type:String,default:""}
    },

},{timestamps:true});
export const User=mongoose.model('User',userSchema);
