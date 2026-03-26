import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict/cropRecommendation`;

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
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
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall),
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
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-center mb-4">
          🌱 Crop Recommendation System
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="number"
              step="any"
              name={key}
              placeholder={key.toUpperCase()}
              value={formData[key]}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg"
            />
          ))}

          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Crop"}
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-green-100">

            <h3 className="text-xl font-semibold text-center">
              🌾 Recommended Crop: {result.recommended_crop}
            </h3>

            <p className="text-center text-gray-700">
              Confidence: {result.confidence_pct}%
            </p>

            <p className="text-center mt-2 italic">
              {result.message}
            </p>

            {/* Top 3 */}
            <div className="mt-4">
              <h4 className="font-semibold">Top 3 Alternatives:</h4>

              <ul className="mt-2 space-y-2">
                {result.top_3.map((crop, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-white p-2 rounded shadow"
                  >
                    <span>{crop.crop}</span>
                    <span>{crop.confidence}%</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;