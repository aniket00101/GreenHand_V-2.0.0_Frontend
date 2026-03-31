import React, { useState } from "react";
import axios from "axios";
import yieldImg from "../assets/f3.avif"; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict-yield`;

const fields = [
  { name: "crop", label: "Crop Name", placeholder: "e.g. Rice", type: "text" },
  { name: "crop_year", label: "Crop Year", placeholder: "e.g. 2024", type: "number" },
  { name: "season", label: "Season", placeholder: "e.g. Kharif", type: "text" },
  { name: "state", label: "State", placeholder: "e.g. Punjab", type: "text" },
  { name: "area", label: "Area (Hectares)", placeholder: "e.g. 150", type: "number", step: "0.01" },
  { name: "production", label: "Production (Tonnes)", placeholder: "e.g. 300", type: "number", step: "0.01" },
  { name: "annual_rainfall", label: "Annual Rainfall (mm)", placeholder: "e.g. 1200", type: "number", step: "0.1" },
  { name: "fertilizer", label: "Fertilizer (kg)", placeholder: "e.g. 500", type: "number", step: "0.01" },
  { name: "pesticide", label: "Pesticide (kg)", placeholder: "e.g. 20", type: "number", step: "0.01" },
];

const CropYield = () => {
  const [formData, setFormData] = useState({
    crop: "", crop_year: "", season: "", state: "", area: "",
    production: "", annual_rainfall: "", fertilizer: "", pesticide: "",
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
        crop_year: Number(formData.crop_year),
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        
        <div className="flex-1 p-6 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
              
              <span className="text-xl text-white">🌾</span>

            </div>

            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

          </div>

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">Yield Prediction</h2>

            <p className="text-gray-500 text-sm font-medium mt-1"> Enter agricultural parameters to estimate total crop yield. </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {fields.map(({ name, label, placeholder, type, step }) => (
              
                <div key={name} className="space-y-1">
                  
                  <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> {label} </label>

                  <input type={type} step={step || "any"} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all"/>

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
                  Predicting...

                </>

              ) : (

                "Predict Yield"

              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 border-2 border-green-200 rounded-xl overflow-hidden md:hidden">
              
              <div className="bg-green-700 px-5 py-4">
              
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1">Estimated Yield</p>
              
                <h3 className="text-2xl font-bold text-white capitalize"> {result.predicted_yield.toFixed(2)} <span className="text-sm font-normal">{result.unit || "tonnes"}</span> </h3>

                <p className="text-green-100 text-xs mt-1 italic"> For {result.crop} in {result.state} ({result.season}) </p>

              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden bg-gray-50 border-l-2 border-green-100">
          {result ? (

            <div className="h-full flex flex-col justify-center items-center p-8 text-center">
              
              <div className="bg-green-700 w-full rounded-2xl p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-500">
                
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-200 mb-4">Final Prediction</p>
                
                <div className="space-y-2">
                
                  <h4 className="text-white text-lg font-medium opacity-80">{result.crop}</h4>
                
                  <h2 className="text-5xl font-black text-white"> {result.predicted_yield.toFixed(2)} </h2>

                  <p className="text-green-400 font-bold tracking-widest uppercase text-sm"> {result.unit || "tonnes/hectare"} </p>

                </div>

                <div className="mt-8 pt-6 border-t border-green-600/50 text-left">
                  <div className="flex justify-between text-green-100 text-xs mb-2">

                    <span>Location:</span> 
                    
                    <span className="font-bold text-white">{result.state}</span>

                  </div>
                  
                  <div className="flex justify-between text-green-100 text-xs">
                  
                    <span>Season:</span> 
                  
                    <span className="font-bold text-white">{result.season}</span>
                  
                  </div>
                </div>
              </div>
            </div>
            
          ) : (

            <div className="group h-full">
              
              <img src={yieldImg} alt="Yield Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

              <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors" />

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CropYield;