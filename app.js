import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
dotenv.config();
import { db } from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import session from "express-session";
db();

let app = express();

//register template engine
app.set("view engine", "ejs");

//middlewares
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser("secret"));
app.use(session({
    cookie: { maxAge: 1000*60*60*24 },
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);
app.use(flash())

app.get("/", (req, res) => {
  res.render("index",{expressFlash:req.flash('error')});
});

app.use("/task", taskRouter);
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  let err = new Error(`This page your'e looking for is not implemented`);
  err.statusCode = 400;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode ? err.statusCode : 500;
  err.message ? err.message : `Internal server error`;
  res.render("pnf", { status: err.statusCode, message: err.message });
});

export default app;
