import { useState } from "react";
import SearchBox from "./components/SearchBox.jsx";
import InfoBox from "./components/InfoBox.jsx";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  return (
    <main className="weather-shell">
      <header><p className="weather-eyebrow">Live conditions</p><h1>Weather Now</h1><p>Search any city for a clear, current forecast.</p></header>
      <SearchBox onWeather={setWeather} />
      <InfoBox weather={weather} />
    </main>
  );
}
