import express from "express";
import dotenv from 'dotenv';
import methodOverride from 'method-override'
dotenv.config()
import { db } from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
db()

let app=express()

//register template engine
app.set("view engine","ejs")

//middlewares
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use("/task",taskRouter);

export default app;