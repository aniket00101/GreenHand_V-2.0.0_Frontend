import React, { useState } from "react";
import axios from "axios";
import weatherImg from "../assets/f6.webp"; 

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
      const res = await axios.get(API_URL, { params: { city } });
      setWeather(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please check the name and try again.");
      } else {
        setError("Weather service unavailable. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  const stats = weather
    ? [
        { icon: "🌡", label: "Temperature", value: `${weather.temperature}°C` },
        { icon: "🤔", label: "Feels Like", value: `${weather.feels_like}°C` },
        { icon: "💧", label: "Humidity", value: `${weather.humidity}%` },
        { icon: "🌬", label: "Wind Speed", value: `${weather.wind_speed} m/s` },
      ]
    : [];

  const ResultPanel = () => (
    <div className="h-full flex flex-col border-l-2 border-green-100">
      <div className="bg-green-700 px-5 py-6 flex-shrink-0">
        
        <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1"> Current Weather </p>

        <div className="flex items-center justify-between">
          <div>

            <h3 className="text-2xl font-bold text-white"> {weather.city}, {weather.country} </h3>

            <p className="text-green-100 text-sm mt-1 italic">{weather.condition}</p>

          </div>

          {weather.icon_url && (

            <img src={weather.icon_url} alt="weather icon" className="w-14 h-14" />

          )}

        </div>
      </div>
      <div className="px-5 py-5 bg-gray-50 flex-1 overflow-y-auto">
        
        <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-3 ml-1"> Details </p>

        <div className="space-y-2">
          {stats.map(({ icon, label, value }) => (
            
            <div key={label} className="flex items-center justify-between bg-white border-2 border-green-100 rounded-lg px-4 py-3">

              <div className="flex items-center gap-3">

                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center"> {icon} </span>

                <span className="text-[10px] font-bold uppercase text-green-700 tracking-widest"> {label} </span>

              </div>

              <span className="text-sm font-bold text-gray-700">{value}</span>

            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

        <div className="flex-1 p-6 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
              
              <span className="text-xl text-white">🌤</span>

            </div>

            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

          </div>

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">Weather Checker</h2>

            <p className="text-gray-500 text-sm font-medium mt-1"> Enter a city name to get current weather conditions. </p>

          </div>

          <div className="space-y-1 mb-4">

            <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> City Name </label>

            <div className="flex gap-3">

              <input type="text" placeholder="e.g. Kolkata" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={handleKey} className="flex-1 border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all"/>

              <button onClick={fetchWeather} disabled={loading} className="bg-green-700 text-white px-6 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-green-800 hover:shadow-green-200 transition-all active:scale-[0.98] disabled:bg-gray-400 text-xs flex items-center gap-2">

                {loading ? (
                  <>

                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...

                  </>
                ) : (

                  "Search"

                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">

              <p className="text-[11px] text-red-600 font-bold text-center uppercase tracking-tight"> {error} </p>

            </div>
          )}

          {weather && (
            <div className="mt-8 border-2 border-green-200 rounded-xl overflow-hidden md:hidden">
              <div className="bg-green-700 px-5 py-4">
                
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1"> Current Weather </p>

                <div className="flex items-center justify-between">
                  <div>

                    <h3 className="text-2xl font-bold text-white"> {weather.city}, {weather.country} </h3>

                    <p className="text-green-100 text-sm mt-1 italic">{weather.condition}</p>

                  </div>

                  {weather.icon_url && (

                    <img src={weather.icon_url} alt="weather icon" className="w-14 h-14" />

                  )}
                </div>
              </div>

              <div className="px-5 py-4 bg-gray-50">

                <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-3 ml-1"> Details </p>

                <div className="space-y-2">
                  {stats.map(({ icon, label, value }) => (
                    
                    <div key={label} className="flex items-center justify-between bg-white border-2 border-green-100 rounded-lg px-4 py-3">

                      <div className="flex items-center gap-3">

                        <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center"> {icon} </span>

                        <span className="text-[10px] font-bold uppercase text-green-700 tracking-widest"> {label} </span>

                      </div>

                      <span className="text-sm font-bold text-gray-700">{value}</span>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden">
          {weather ? (

            <ResultPanel />

          ) : (
            <div className="group h-full">

              <img src={weatherImg} alt="Weather Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

              <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors" />

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
