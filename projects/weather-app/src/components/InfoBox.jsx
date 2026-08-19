import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function InfoBox({ weather }) {
  if (!weather) return <section className="weather-empty"><span>☀️</span><h2>Ready for a forecast</h2><p>Your searched city will appear here.</p></section>;
  return (
    <Card className="weather-card" component="section">
      <CardContent className="weather-card-content">
      <div><p className="location">{weather.city}, {weather.country}</p><h2>{Math.round(weather.temp)}°C</h2><p className="description">{weather.description}</p></div>
      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
      <dl>
        <div><dt>Feels like</dt><dd>{Math.round(weather.feelsLike)}°</dd></div>
        <div><dt>Humidity</dt><dd>{weather.humidity}%</dd></div>
        <div><dt>Low</dt><dd>{Math.round(weather.tempMin)}°</dd></div>
        <div><dt>High</dt><dd>{Math.round(weather.tempMax)}°</dd></div>
      </dl>
      </CardContent>
    </Card>
  );
}
