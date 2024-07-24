import jwt from 'jsonwebtoken'
import User from '../models/User.js';
//verifies token

export const auth=async (req,res,next)=>{
try {
    //take test token from cookie
    let testToken=req.cookies.token

    if(!testToken){
        req.flash('error', 'Please login to access this page');
        return res.redirect("/")
    }

    //split token to get actual token
    let token=testToken.split(" ")[1]

    //verify token using jwt
    let decodedToken=await jwt.verify(token,process.env.JWT_SECRET)

    //from decoded token use user data
    let id=decodedToken?.id

    //find user using user data
    let user=await User.findById(id).select("-password -confirmPassword")

    //if user is present set it to request object 
    req.user=user
    next()
} catch (error) {
    res.sendStatus(400)
    throw new Error(error.message)
}
}