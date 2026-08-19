import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), task: "Practice state updates", done: true },
    { id: crypto.randomUUID(), task: "Build a reusable component", done: false },
  ]);
  const [task, setTask] = useState("");

  function addTodo(event) {
    event.preventDefault();
    const cleanTask = task.trim();
    if (!cleanTask) return;
    setTodos((items) => [...items, { id: crypto.randomUUID(), task: cleanTask, done: false }]);
    setTask("");
  }

  const updateOne = (id) => setTodos((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  const updateAll = () => setTodos((items) => items.map((item) => ({ ...item, done: true })));
  const remove = (id) => setTodos((items) => items.filter((item) => item.id !== id));

  return (
    <div>
      <h2>Todo: arrays and state</h2>
      <form className="inline-form" onSubmit={addTodo}>
        <input value={task} onChange={(event) => setTask(event.target.value)} placeholder="Add a task" aria-label="New task" />
        <button>Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <button className="task-button" onClick={() => updateOne(todo.id)}><span className={todo.done ? "done" : ""}>{todo.task}</span></button>
            <button className="danger" onClick={() => remove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="secondary" onClick={updateAll}>Mark all done</button>
    </div>
  );
}
