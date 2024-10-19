const mysql = require("mysql");
const util = require("util");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "TodolistDB",
});

const db = con;
const query = util.promisify(con.query).bind(con);
exports.test = async (req, res) => {
  try {
    res.send("test complete");
  } catch (err) {
    res.send("error");
  }
};
exports.createTask = (req, res) => {
  const task_name = req.body.task_name;
  try {
    db.query(
      "INSERT INTO Task (task_name) VALUES (?)",
      [task_name],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      },
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.listtask = async (req, res) => {
  try {
    const result = await query("SELECT * FROM Task");
    res.status(200).send(result);
  } catch (err) {
    res.send(err);
  }
};
exports.edittask = async (req, res) => {
  const task_id = req.params.task_id;
  const task_name = req.body.task_name;
  try {
    const result = await query(
      "UPDATE Task set task_name = ? WHERE task_id = ? ",
      [task_name, task_id],
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.deleteTask = async (req, res) => {
  const task_id = req.params.task_id;
  try {
    const result = await query("DELETE FROM Task WHERE task_id = ? ", [
      task_id,
    ]);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
