const express = require("express");

const router = express.Router();

const {
  createTask,
  fetchTask,
  fetchTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", fetchTask);
router.get("/:id", fetchTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
