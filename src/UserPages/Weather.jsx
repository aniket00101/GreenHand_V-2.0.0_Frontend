import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/weather`;

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(API_URL, {
        params: { city },
      });

      setWeather(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found");
      } else {
        setError("Weather service unavailable");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          🌤 Weather Checker
        </h2>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city (e.g. Kolkata)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 border p-2 rounded-lg"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">Loading...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Weather Data */}
        {weather && (
          <div className="text-center space-y-2">

            <h3 className="text-xl font-semibold">
              {weather.city}, {weather.country}
            </h3>

            <img
              src={weather.icon_url}
              alt="weather icon"
              className="mx-auto"
            />

            <p className="text-3xl font-bold">
              {weather.temperature}°C
            </p>

            <p className="text-gray-600">
              {weather.condition}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <p>🌡 Feels: {weather.feels_like}°C</p>
              <p>💧 Humidity: {weather.humidity}%</p>
              <p>🌬 Wind: {weather.wind_speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;