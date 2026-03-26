import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict/fertilizerRecommendation`;

const FertilizerPrediction = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soil_type: "",
    crop_type: "",
    nitrogen: "",
    phosphorous: "",
    potassium: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        moisture: Number(formData.moisture),
        soil_type: formData.soil_type,
        crop_type: formData.crop_type,
        nitrogen: Number(formData.nitrogen),
        phosphorous: Number(formData.phosphorous),
        potassium: Number(formData.potassium),
      };

      const res = await axios.post(API_URL, payload);
      setResult(res.data);
    } catch (err) {
      setError("Prediction failed. Check inputs or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">

        <h2 className="text-2xl font-bold text-center mb-4">
          🌿 Fertilizer Recommendation System
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input type="number" name="temperature" placeholder="Temperature (°C)" onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" name="humidity" placeholder="Humidity (%)" onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" name="moisture" placeholder="Soil Moisture" onChange={handleChange} required className="border p-2 rounded-lg" />

          {/* ✅ Changed to Input */}
          <input
            type="text"
            name="soil_type"
            placeholder="Soil Type (e.g. Loamy)"
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          {/* ✅ Changed to Input */}
          <input
            type="text"
            name="crop_type"
            placeholder="Crop Type (e.g. Rice)"
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input type="number" name="nitrogen" placeholder="Nitrogen (N)" onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" name="phosphorous" placeholder="Phosphorous (P)" onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" name="potassium" placeholder="Potassium (K)" onChange={handleChange} required className="border p-2 rounded-lg" />

          <button
            type="submit"
            className="col-span-2 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Recommend Fertilizer"}
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-yellow-100">

            <h3 className="text-xl font-semibold text-center">
              🌾 Recommended Fertilizer: {result.recommended_fertilizer}
            </h3>

            <p className="text-center">
              Confidence: {result.confidence_pct}%
            </p>

            <p className="text-center mt-2 italic">
              {result.message}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold">Advice:</h4>
              <p className="bg-white p-2 rounded mt-2">{result.advice}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Top 3 Alternatives:</h4>
              <ul className="mt-2 space-y-2">
                {result.top_3.map((item, i) => (
                  <li key={i} className="flex justify-between bg-white p-2 rounded shadow">
                    <span>{item.fertilizer}</span>
                    <span>{item.confidence}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-right">
              {result.timestamp}
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerPrediction;