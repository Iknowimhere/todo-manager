import { Router } from "express";
import { getLoginPage, getSignupPage, login, signup } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";


let userRouter=Router()


userRouter.get("/signup",getSignupPage)
userRouter.post("/signup",signup)


userRouter.get("/login",getLoginPage)
userRouter.post("/login",login)

userRouter.get("/home",auth,(req,res,next)=>{
res.send(`Welcome to home page ${req.user.name}!`)
})
    

export default userRouter;