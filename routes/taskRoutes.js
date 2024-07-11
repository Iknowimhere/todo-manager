import express from 'express'
import { deleteTask, getTask, getTasks, postTask, updatedTask } from '../controllers/taskControllers.js'

let taskRouter = express.Router()

//POST http://localhost:5000/task
taskRouter.post("/", postTask)

//GET http://localhost:5000/task
taskRouter.get("/", getTasks)


taskRouter.get("/:id", getTask)


taskRouter.put("/:id", updatedTask)


taskRouter.delete("/:id", deleteTask)

export default taskRouter;
