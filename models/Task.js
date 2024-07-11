import mongoose from "mongoose"

//schema 
let taskSchema=new mongoose.Schema({
    name:String,
    isCompleted:{
      type:Boolean,
      default:false
    }
  })
  
  let Task=mongoose.model("Task",taskSchema)

  export default Task;