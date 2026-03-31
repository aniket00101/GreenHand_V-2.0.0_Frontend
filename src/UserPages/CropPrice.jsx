import React, { useState } from "react";
import axios from "axios";
import priceImg from "../assets/f2.avif"; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict/cropPrice`;

const fields = [
  { name: "crop", label: "Crop Name", placeholder: "e.g. Wheat", type: "text" },
  { name: "state", label: "State", placeholder: "e.g. Haryana", type: "text" },
  { name: "season", label: "Season", placeholder: "e.g. Rabi", type: "text" },
  { name: "year", label: "Year", placeholder: "e.g. 2024", type: "number" },
  { name: "month", label: "Month (1-12)", placeholder: "e.g. 4", type: "number" },
  { name: "temperature_c", label: "Temp (°C)", placeholder: "e.g. 25", type: "number", step: "0.1" },
  { name: "humidity_pct", label: "Humidity (%)", placeholder: "e.g. 60", type: "number", step: "0.1" },
  { name: "rainfall_mm", label: "Rainfall (mm)", placeholder: "e.g. 150", type: "number", step: "0.1" },
  { name: "arrivals_tonnes", label: "Arrivals (Tonnes)", placeholder: "e.g. 500", type: "number", step: "0.1" },
  { name: "prev_month_price", label: "Prev Price (Optional)", placeholder: "e.g. 2100", type: "number", step: "0.1" },
];

const CropPrice = () => {
  const [formData, setFormData] = useState({
    crop: "", state: "", season: "", year: "", month: "",
    temperature_c: "", humidity_pct: "", rainfall_mm: "",
    arrivals_tonnes: "", prev_month_price: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        ...formData,
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
      setError("Prediction failed. Please check your inputs or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        
        <div className="flex-1 p-6 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
            
              <span className="text-xl text-white">💰</span>
            
            </div>
            
            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

          </div>

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">Price Prediction</h2>

            <p className="text-gray-500 text-sm font-medium mt-1"> Estimate market prices based on arrivals, weather, and historical data. </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {fields.map(({ name, label, placeholder, type, step }) => (
              
                <div key={name} className="space-y-1">
                
                  <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> {label} </label>

                  <input type={type} step={step || "any"} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} required={name !== "prev_month_price"} className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all"/>

                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">

                <p className="text-[11px] text-red-600 font-bold text-center uppercase tracking-tight">{error}</p>

              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-green-800 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-2 text-xs flex justify-center items-center gap-2">

              {loading ? (
                <>

                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating...

                </>
              ) : (

                "Predict Market Price"

              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 border-2 border-green-200 rounded-xl overflow-hidden md:hidden">
              
              <div className="bg-green-700 px-5 py-6 text-white">
              
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1">Predicted Modal Price</p>
              
                <h3 className="text-3xl font-bold">₹{result.predicted_modal_price}</h3>
              
                <div className="mt-3 text-xs flex justify-between border-t border-green-600 pt-3">
              
                  <span>Min: ₹{result.predicted_min_price}</span>
              
                  <span>Max: ₹{result.predicted_max_price}</span>
              
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden border-l-2 border-green-100 bg-gray-50">
          {result ? (
            <div className="h-full flex flex-col">
              
              <div className="bg-green-700 px-6 py-10 text-white flex-shrink-0">
              
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1">Expected Market Price</p>
              
                <h3 className="text-4xl font-black">₹{result.predicted_modal_price}</h3>
              
                <p className="text-green-300 text-xs mt-2 uppercase font-bold tracking-tighter"> {result.crop} • {result.state} • {result.month}/{result.year} </p>

              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div>
                  
                  <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-3">Price Range</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                  
                    <div className="bg-white border-2 border-green-100 p-3 rounded-lg text-center">
                  
                      <p className="text-[9px] uppercase font-bold text-gray-400">Min Price</p>
                  
                      <p className="text-lg font-bold text-gray-700">₹{result.predicted_min_price}</p>
                  
                    </div>
                  
                    <div className="bg-white border-2 border-green-100 p-3 rounded-lg text-center">
                  
                      <p className="text-[9px] uppercase font-bold text-gray-400">Max Price</p>
                  
                      <p className="text-lg font-bold text-gray-700">₹{result.predicted_max_price}</p>
                  
                    </div>
                  </div>
                  
                  <p className="text-center mt-3 text-xs font-bold text-green-600 bg-green-50 py-1 rounded-full border border-green-100"> Trend: {result.price_range_label} </p>

                </div>

                <div className="bg-white border-2 border-green-100 p-4 rounded-xl">
                  
                  <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-2">Market Insight</p>
                  
                  <p className="text-sm text-gray-600 leading-relaxed italic">"{result.market_insight}"</p>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  
                    <span className="text-[10px] font-bold text-gray-400 uppercase">MSP Reference</span>
                  
                    <span className="text-sm font-bold text-green-700">₹{result.msp_reference}</span>
                  
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="group h-full relative">
              
              <img src={priceImg} alt="Market Price" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

              
              <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
              
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Intelligence</p>
              
                <h4 className="text-xl font-bold">Market Price Forecasting</h4>
              
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropPrice;