import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict/cropPrice`;

const CropPrice = () => {
  const [formData, setFormData] = useState({
    crop: "",
    state: "",
    season: "",
    year: "",
    month: "",
    temperature_c: "",
    humidity_pct: "",
    rainfall_mm: "",
    arrivals_tonnes: "",
    prev_month_price: "",
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
        state: formData.state,
        season: formData.season,
        year: Number(formData.year),
        month: Number(formData.month),
        temperature_c: Number(formData.temperature_c),
        humidity_pct: Number(formData.humidity_pct),
        rainfall_mm: Number(formData.rainfall_mm),
        arrivals_tonnes: Number(formData.arrivals_tonnes),
        prev_month_price: formData.prev_month_price ? Number(formData.prev_month_price) : null,
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
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          💰 Crop Price Prediction
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input type="text" name="crop" placeholder="Crop Name" value={formData.crop} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="text" name="season" placeholder="Season (e.g. Rabi/Kharif)" value={formData.season} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" name="month" placeholder="Month (1-12)" value={formData.month} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" step="0.1" name="temperature_c" placeholder="Temperature (°C)" value={formData.temperature_c} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" step="0.1" name="humidity_pct" placeholder="Humidity (%)" value={formData.humidity_pct} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" step="0.1" name="rainfall_mm" placeholder="Rainfall (mm)" value={formData.rainfall_mm} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" step="0.1" name="arrivals_tonnes" placeholder="Arrivals (Tonnes)" value={formData.arrivals_tonnes} onChange={handleChange} required className="border p-2 rounded-lg" />
          <input type="number" step="0.1" name="prev_month_price" placeholder="Previous Month Price (Optional)" value={formData.prev_month_price} onChange={handleChange} className="border p-2 rounded-lg" />

          <button type="submit" className="col-span-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700" disabled={loading}>
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>

        {/* ERROR */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-green-100 space-y-2">

            <h3 className="text-xl font-semibold text-center">
              Crop: {result.crop} | State: {result.state}
            </h3>

            <p className="text-center">
              Season: {result.season} | Month: {result.month} | Year: {result.year}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-2 text-center">
              <p>Min Price: ₹{result.predicted_min_price}</p>
              <p>Modal Price: ₹{result.predicted_modal_price}</p>
              <p>Max Price: ₹{result.predicted_max_price}</p>
            </div>

            <p className="text-center text-gray-700 mt-2">Range Label: {result.price_range_label}</p>

            <p className="mt-2">
              <strong>MSP Reference:</strong> ₹{result.msp_reference}
            </p>

            <p className="mt-2">
              <strong>Market Insight:</strong> {result.market_insight}
            </p>

            <p className="text-xs text-gray-500 mt-3 text-right">
              {result.timestamp}
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrice;