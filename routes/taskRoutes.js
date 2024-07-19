import express from 'express'
import { deleteTask, getTask, getTasks, postTask, updatedTask } from '../controllers/taskControllers.js'
import { auth } from '../middlewares/auth.js'

let taskRouter = express.Router()


taskRouter.post("/", auth,postTask)


taskRouter.get("/", auth,getTasks)


taskRouter.get("/:id", auth,getTask)


taskRouter.put("/:id", auth,updatedTask)


taskRouter.delete("/:id", auth,deleteTask)

export default taskRouter;
