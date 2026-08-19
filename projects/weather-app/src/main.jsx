import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from "./WeatherApp.jsx";
import "./weather.css";

createRoot(document.getElementById("root")).render(<StrictMode><WeatherApp /></StrictMode>);
