const taskModel = require("../models/TaskModal");
const mongoose = require("mongoose");
//To create a task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await taskModel.create({ title, description });
    res.status(200)?.json({
      status: 1,
      data: task,
    });
  } catch (e) {
    res.status(400).json({ status: 0, errorMessage: e });
  }
};

//GET all task
const fetchTask = async (req, res) => {
  try {
    const task = await taskModel.find({});
    res.status(200)?.json({
      status: 1,
      data: task,
    });
  } catch (e) {
    res.status(400).json({ status: 0, errorMessage: e });
  }
};

//GET  task by id
const fetchTaskById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 0,
      errorMessage: "Task Not Found",
    });
  }
  try {
    const task = await taskModel.findById(id);
    res.status(200)?.json({
      status: 1,
      data: task,
    });
  } catch (e) {
    res.status(400).json({ status: 0, errorMessage: e });
  }
};

// PUT task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 0,
      errorMessage: "Task Not Found",
    });
  }
  try {
    await taskModel.findByIdAndUpdate({ _id: id }, { ...req.body });
    const updatedtask = await taskModel.findById(id);
    res.status(200)?.json({
      status: 1,
      data: updatedtask,
      message: "Updated successfully",
    });
  } catch (e) {
    res.status(400).json({ status: 0, errorMessage: e });
  }
};
// DELETE task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 0,
      errorMessage: "Task Not Found",
    });
  }
  try {
    await taskModel.findByIdAndDelete(id);
    const updatedtask = await taskModel.findById(id);
    res.status(200)?.json({
      status: 1,
      data: {},
      message: "Deleted successfully",
    });
  } catch (e) {
    res.status(400).json({ status: 0, errorMessage: e });
  }
};

module.exports = {
  createTask,
  fetchTask,
  fetchTaskById,
  updateTask,
  deleteTask,
};
