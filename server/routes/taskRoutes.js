const express = require("express");
const {
  test,
  listtask,
  edittask,
  createTask,
  deleteTask,
} = require("../controllers/taskControllers.js");
const router = express.Router();

router.post("/task", createTask); //create
router.get("/task", listtask); //read
router.patch("/task/:task_id", edittask); //update
router.delete("/task/:task_id", deleteTask); //delete
module.exports = router;
