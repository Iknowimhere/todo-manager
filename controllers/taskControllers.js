import Task from "../models/Task.js"

//desc   create a task
//@route POST /task
//access Public
export const postTask = async (req, res, next) => {
    let { name } = req.body
    if (!name) {
        return res.status(400).json("Please fill all the fields")
    }
    try {
        let newTask = await Task.create({
            name
        })
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


//desc   get all tasks
//@route GET /task
//access Public
export const getTasks = async (req, res, next) => {
    try {
        let tasks = await Task.find()
        res.render("home",{title:"Home page",tasks})
        // res.status(200).json(tasks)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//desc   get a task
//@route GET /task/:id
//access Public
export const getTask = async (req, res, next) => {
    let {id}=req.params
    try {
        let task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json("Couldn't get a task")
    }
}



//desc   update status of a task
//@route PUT /task/:id
//access Public
export const updatedTask = async (req, res, next) => {
    let { id } = req.params
    let { isCompleted } = req.body
    try {
        let updatedTask = await Task.findByIdAndUpdate(id, { isCompleted: isCompleted }, { new: true })
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(400).json("Couldn't update a task")
    }
}


//@desc   delete a task
//@route DELETE /task/:id
//@access Public
export const deleteTask = async (req, res, next) => {
    let { id } = req.params
    try {
        await Task.findByIdAndDelete(id)
        res.status(200).json("Deleted a task")
    } catch (error) {
        res.status(400).json("Couldn't delete a task")
    }
}