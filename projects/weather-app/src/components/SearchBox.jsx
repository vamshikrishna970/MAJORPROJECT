import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SearchBox({ onWeather }) {
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  async function search(event) {
    event.preventDefault();
    const query = city.trim();
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!query) return setStatus("Enter a city name.");
    if (!apiKey) return setStatus("Add VITE_WEATHER_API_KEY to a .env file first.");

    setStatus("Loading…");
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`);
      if (!response.ok) throw new Error(response.status === 404 ? "City not found." : "Weather service unavailable.");
      const data = await response.json();
      onWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setStatus("");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <form className="weather-search" onSubmit={search}>
      <label htmlFor="city">City</label>
      <div>
        <TextField id="city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Hyderabad" variant="filled" fullWidth />
        <Button type="submit" variant="contained" size="large">Search</Button>
      </div>
      {status && <p role="status">{status}</p>}
    </form>
  );
}
