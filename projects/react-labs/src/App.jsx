import { useState } from "react";
import ProductTab from "./components/ProductTab.jsx";
import LikeButton from "./components/LikeButton.jsx";
import TodoList from "./components/TodoList.jsx";
import Lottery from "./components/Lottery.jsx";
import CommentBoard from "./components/CommentBoard.jsx";

const products = [
  { title: "Logitech MX Master", features: ["8K DPI", "Silent clicks"], oldPrice: 12495, newPrice: 8999 },
  { title: "Apple Pencil", features: ["Pixel precision", "USB-C"], oldPrice: 11900, newPrice: 7900 },
  { title: "Zebronics Keyboard", features: ["Mechanical", "RGB lighting"], oldPrice: 3999, newPrice: 2499 },
  { title: "Samsung T7 SSD", features: ["1 TB", "USB 3.2"], oldPrice: 10999, newPrice: 7499 },
];

export default function App() {
  const [section, setSection] = useState("products");
  const sections = {
    products: <ProductTab products={products} />,
    state: <LikeButton />,
    todos: <TodoList />,
    lottery: <Lottery winningSum={15} ticketLength={3} />,
    comments: <CommentBoard />,
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Sigma 5 • React Parts 1–6</p>
        <h1>React Concepts Lab</h1>
        <p>Components, props, events, state, arrays, forms, validation, effects, and reusable logic.</p>
      </header>
      <nav className="tabs" aria-label="React demonstrations">
        {Object.keys(sections).map((name) => (
          <button className={section === name ? "active" : ""} key={name} onClick={() => setSection(name)}>
            {name}
          </button>
        ))}
      </nav>
      <section className="demo-panel">{sections[section]}</section>
    </main>
  );
}
