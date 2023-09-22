import React, { useState } from 'react';
import './style.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        text: taskInput,
        completed: false,
      };
      setTasks(tasks.concat(newTask));
      setTaskInput('');
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { id: task.id, text: task.text, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (taskId: number, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { id: task.id, text: newText, completed: task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="Body">
      <h1>To do list</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Wpisz coś"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Dodaj</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'ukonczone' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => editTask(task.id, e.target.value)}
            />
            <button onClick={() => deleteTask(task.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
