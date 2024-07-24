import User from "../models/User.js";
import jwt from 'jsonwebtoken'


export const getSignupPage=(req,res,next)=>{
    res.render("signup",{title:"Signup page",expressFlash: req.flash('error')})
}


export const getLoginPage=(req,res,next)=>{
    res.render("login",{title:"Login page"})
}


//signup
export const signup=async (req,res,next)=>{
    const {name,email,password,confirmPassword}=req.body
    if(!name || !email || !password || !confirmPassword){
        req.flash('error', 'Please fill all the fields');
        return res.redirect("/users/signup")
    }
    try {
        //checking for existing user
        let existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json("User exists already")
        }
        //creating new user
        let newUser=await User.create({
            name,email,password,confirmPassword
        })

        //jwt token    
        let token=await jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
            expiresIn:24*60*60
        })

      //set cookie
      res.cookie("token",`Bearer ${token}`,{
        maxAge:24*60*60*1000,
        httpOnly:true
      })

      //redirect to task home page
      res.redirect("/task")
    } catch (error) {
        res.status(400).json(error.message) 
    }
}

//login

export const login=async (req,res,next)=>{
    const {email,password}=req.body
    try {
        //checking for existing user
        let existingUser=await User.findOne({email})
        if(!existingUser || !(await existingUser.verifyPassword(password,existingUser.password))){
            return res.status(400).json("User doesn't exist")
        }
        //jwt token    
        let token=await jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{
            expiresIn:24*60*60
        })

      //set cookie
      res.cookie("token",`Bearer ${token}`,{
        maxAge:24*60*60*1000,
        httpOnly:true
      })

      //redirect to task home page
      res.redirect("/task")
    } catch (error) {
        res.status(400).json(error.message) 
    }
}

export const logout=(req,res,next)=>{
    res.clearCookie("token")
    res.redirect("/users/login")
}