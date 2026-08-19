import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "./todoSlice.js";

export default function App() {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  function submit(event) {
    event.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;
    dispatch(addTodo(cleanText));
    setText("");
  }

  return (
    <main className="todo-app">
      <p className="kicker">Redux Toolkit</p><h1>Focus List</h1><p>Provider, selectors, slices, reducers, and dispatched actions.</p>
      <form onSubmit={submit}><input value={text} onChange={(event) => setText(event.target.value)} placeholder="What needs doing?" aria-label="New todo" /><button>Add task</button></form>
      <ul>{todos.map((todo) => <li key={todo.id}><button className="toggle" onClick={() => dispatch(toggleTodo(todo.id))} aria-label={`Toggle ${todo.text}`}>{todo.done ? "✓" : ""}</button><span className={todo.done ? "done" : ""}>{todo.text}</span><button className="delete" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button></li>)}</ul>
      <footer>{todos.filter((todo) => !todo.done).length} tasks remaining</footer>
    </main>
  );
}
