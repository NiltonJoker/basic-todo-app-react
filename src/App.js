import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { map, size } from "lodash";
import firebase from "./utils/firebase";
import "firebase/firestore";
import AddTasks from "./components/AddTask";
import Task from "./components/Task";
import "./App.scss";

const db = firebase.firestore(firebase);

function App() {
  const [tasks, setTasks] = useState(null);
  const [reloadTask, setReloadTask] = useState(true);

  useEffect(() => {
    if (reloadTask) {
      db.collection("tasks")
        .orderBy("completed")
        .get()
        .then((response) => {
          const arrayTasks = [];
          map(response.docs, (task) => {
            const data = task.data();
            data.id = task.id;
            arrayTasks.push(data);
          });
          setTasks(arrayTasks);
        });
      setReloadTask(false);
    }
  }, [reloadTask]);

  return (
    <Container className="app" fluid>
      <div className="title">
        <h1>Nilton Riega Manchego</h1>
      </div>
      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Tareas del Día</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
        {!tasks ? (
          <div className="loading">
            <Spinner animation="border"/>
            <span>Cargando</span>
          </div>
        ) : size(tasks) === 0 ? (
          <h3>No hay Tareas</h3>
        ) : (
          map(tasks, (task) => (
            <Task key={task.id} task={task} setReloadTask={setReloadTask} />
          ))
        )}
        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTasks setReloadTask={setReloadTask} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
