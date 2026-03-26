import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict-yield`;

const CropYield = () => {
  const [formData, setFormData] = useState({
    crop: "",
    crop_year: "",
    season: "",
    state: "",
    area: "",
    production: "",
    annual_rainfall: "",
    fertilizer: "",
    pesticide: "",
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
        crop: formData.crop,
        crop_year: Number(formData.crop_year),
        season: formData.season,
        state: formData.state,
        area: Number(formData.area),
        production: Number(formData.production),
        annual_rainfall: Number(formData.annual_rainfall),
        fertilizer: Number(formData.fertilizer),
        pesticide: Number(formData.pesticide),
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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          🌾 Crop Yield Prediction
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="crop"
            placeholder="Crop Name"
            value={formData.crop}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            name="crop_year"
            placeholder="Crop Year"
            value={formData.crop_year}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          {/* ✅ Season as input field */}
          <input
            type="text"
            name="season"
            placeholder="Season (e.g. Kharif, Rabi, Whole Year)"
            value={formData.season}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            step="0.01"
            name="area"
            placeholder="Area (hectares)"
            value={formData.area}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            step="0.01"
            name="production"
            placeholder="Production (tonnes)"
            value={formData.production}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            step="0.1"
            name="annual_rainfall"
            placeholder="Annual Rainfall (mm)"
            value={formData.annual_rainfall}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            step="0.01"
            name="fertilizer"
            placeholder="Fertilizer Used (kg)"
            value={formData.fertilizer}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            step="0.01"
            name="pesticide"
            placeholder="Pesticide Used (kg)"
            value={formData.pesticide}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Yield"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-blue-100 text-center">
            <h3 className="text-xl font-semibold">
              Predicted Yield for {result.crop} in {result.state} ({result.season}, {result.crop_year})
            </h3>
            <p className="mt-2 text-lg">
              <strong>{result.predicted_yield.toFixed(2)} {result.unit}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropYield;