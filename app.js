import express from "express";
import dotenv from 'dotenv';
import methodOverride from 'method-override'
dotenv.config()
import { db } from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
db()

let app=express()

//register template engine
app.set("view engine","ejs")

//middlewares
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.render("index")
// })

// app.use("/task",taskRouter);
// app.use("/users",userRouter);

// cookie

app.get("/set-cookie",(req,res)=>{
    res.cookie("user","shankar",{
        maxAge:1000*60*60*24,
        httpOnly:true
    })
    res.send("cookie set")
})

app.get("/get-cookie",(req,res)=>{
    res.send(`cookie is ${req.cookies.user}`)
})

app.get("/update-cookie",(req,res)=>{
    res.cookie("user","stark",{
        maxAge:1000*60*60*24,
        httpOnly:true
    })
    res.send("cookie updated")
})

app.get("/delete-cookie",(req,res)=>{
    res.clearCookie("user")
    res.send("cookie deleted")
})

export default app;