import Task from "../models/Task.js";

//desc   create a task
//@route POST /task
//access Public
export const postTask = async (req, res, next) => {
  let { name } = req.body;
  if (!name) {
    return res.status(400).json("Please fill all the fields");
  }
  try {
      await Task.create({
      user:req.user._id,
      name,
    });
    // res.status(201).json(newTask)
    res.redirect("/task");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//desc   get all tasks
//@route GET /task
//access Public
export const getTasks = async (req, res, next) => {
  try {
    let tasks = await Task.find({user:req.user._id});
    res.render("home", { title: "Home page", tasks });
    // res.status(200).json(tasks)
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//desc   get a task
//@route GET /task/:id
//access Public
export const getTask = async (req, res, next) => {
  let { id } = req.params;
  try {
    let task = await Task.findOne({user:req.user._id,_id:id});
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json("Couldn't get a task");
  }
};

//desc   update status of a task
//@route PUT /task/:id
//access Public
export const updatedTask = async (req, res, next) => {
  let { id } = req.params;
  let { isCompleted } = req.body;
  try {
    await Task.findOneAndUpdate({user:req.user._id,_id:id}, { isCompleted: isCompleted });
    // res.status(200).json(updatedTask)
    res.redirect("/task");
  } catch (error) {
    res.status(400).json("Couldn't update a task");
  }
};

//@desc   delete a task
//@route DELETE /task/:id
//@access Public
export const deleteTask = async (req, res, next) => {
  let { id } = req.params;
  try {
    await Task.findOneAndDelete({user:req.user._id,_id:id});
    res.redirect("/task");
  } catch (error) {
    res.status(400).json("Couldn't delete a task");
  }
};
