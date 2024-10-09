import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
function App() {
  const [refresh, setRefresh] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [editTaskID, setEditTaskID] = useState(null);

  const createTask = () => {
    axios
      .post("http://localhost:5012/task", { task_name: taskName })
      .then(() => setRefresh(true))
      .catch((error) => console.log(error));
  };
  const updateTask = (task_id, currentTaskName) => {
    axios
      .patch(`http://localhost:5012/task/${task_id}`, {
        task_name: newTaskName,
      })
      .then(() => {
        setRefresh(true);
        setEditTaskID(null);
        setNewTaskName("");
      })
      .catch((error) => console.log(error));
  };
  const deleteTask = (task_id) => {
    axios
      .delete(`http://localhost:5012/task/${task_id}`)
      .then(() => setRefresh(true))
      .catch((error) => console.log(error));
  };

  const handleEditButton = (task_id, task_name) => {
    setEditTaskID(task_id);
    setNewTaskName(task_name);
  };

  useEffect(() => {
    axios.get("http://localhost:5012/task").then((res) => {
      setTaskData(res.data);
      setRefresh(false);
    });
  }, [refresh]);
  console.log("taskname", taskName);
  console.log("newTaskname", newTaskName);
  return (
    <>
      <div>
        <p>Todolist</p>
        <input onChange={(e) => setTaskName(e.target.value)}></input>
        <button onClick={createTask}>add</button>
        {taskData.map((task) => (
          <div key={task.id}>
            {task.task_name}
            {editTaskID === task.task_id ? (
              <span>
                <input
                  onChange={(e) => setNewTaskName(e.target.value)}
                  defaultValue={task.task_name}
                ></input>
                <button onClick={() => updateTask(task.task_id)}>
                  confirm
                </button>
              </span>
            ) : (
              <button
                onClick={() => handleEditButton(task.task_id, task.task_name)}
              >
                edit
              </button>
            )}
            <button onClick={() => deleteTask(task.task_id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
