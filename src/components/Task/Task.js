import React from "react";

import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import firebase from '../../utils/firebase'
import 'firebase/firestore'
import "./Task.scss";

const db = firebase.firestore(firebase)

const Task = ({ task, setReloadTask }) => {

  const completedTask = () =>{
    db.collection('tasks')
      .doc(task.id)
      .update({completed: !task.completed})
      .then(() =>{
        setReloadTask(true)
      })
  }

  const deleteTask =() => {
    db.collection('tasks')
    .doc(task.id)
    .delete()
    .then(() =>{
      setReloadTask(true)
    })
  }

  return (
    <div className="task">
      <div>
        <Check onClick={completedTask} className={task.completed ? "completed" : ""}/>
      </div>
      <div>{task.name}</div>
      <div>
        <Delete onClick={deleteTask}/>
      </div>
    </div>
  );
};

export default Task;
