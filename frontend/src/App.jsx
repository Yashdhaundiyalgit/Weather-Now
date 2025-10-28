import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const response = await fetch(`http://localhost:5000/weather?city=${city}`);
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Weather Now 🌤</h1>

      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "260px" }}
      />

      <button onClick={getWeather} style={{ padding: "10px", marginLeft: "10px" }}>
        Get Weather
      </button>

      {weather && (
        <div style={{ marginTop: "25px", fontSize: "18px" }}>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Wind Speed:</strong> {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
