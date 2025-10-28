import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  try {
    const geo = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    if (!geo.data.results) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude } = geo.data.results[0];

    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    return res.json(weather.data.current_weather);
  } catch (err) {
    return res.status(500).json({ error: "Weather fetch failed" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
