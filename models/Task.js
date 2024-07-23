import mongoose from "mongoose"

//schema 
let taskSchema=new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    name:{
      type:String,
      required:true
    },
    isCompleted:{
      type:Boolean,
      default:false
    }
  })
  
  let Task=mongoose.model("Task",taskSchema)

  export default Task;