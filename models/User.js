import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      validate:{
        validator:function(value){
          return this.password===value
        },
        message:"Confirm password doesn't match"
      }
    },
  },
  { timestamps: true }
);
//pre hook to hash the password before the doc is created
//it is a middleware
userSchema.pre("save",async function(next){
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
  next()
})

//verifyPassword

userSchema.methods.verifyPassword=async function(pwd,pwdDB){
  return await bcrypt.compare(pwd,pwdDB)
}

let User=model("User",userSchema)


export default User;