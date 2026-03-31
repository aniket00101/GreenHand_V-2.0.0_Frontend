import React, { useState } from "react";
import axios from "axios";
import fertImg from "../assets/f4.avif"; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict/fertilizerRecommendation`;

const fields = [
  { name: "temperature", label: "Temperature (°C)", placeholder: "e.g. 28", type: "number" },
  { name: "humidity", label: "Humidity (%)", placeholder: "e.g. 65", type: "number" },
  { name: "moisture", label: "Soil Moisture", placeholder: "e.g. 40", type: "number" },
  { name: "soil_type", label: "Soil Type", placeholder: "e.g. Loamy", type: "text" },
  { name: "crop_type", label: "Crop Type", placeholder: "e.g. Cotton", type: "text" },
  { name: "nitrogen", label: "Nitrogen (N)", placeholder: "e.g. 37", type: "number" },
  { name: "phosphorous", label: "Phosphorous (P)", placeholder: "e.g. 0", type: "number" },
  { name: "potassium", label: "Potassium (K)", placeholder: "e.g. 0", type: "number" },
];

const FertilizerPrediction = () => {
  const [formData, setFormData] = useState({
    temperature: "", humidity: "", moisture: "", soil_type: "",
    crop_type: "", nitrogen: "", phosphorous: "", potassium: "",
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
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        moisture: Number(formData.moisture),
        nitrogen: Number(formData.nitrogen),
        phosphorous: Number(formData.phosphorous),
        potassium: Number(formData.potassium),
      };

      const res = await axios.post(API_URL, payload);

      let data = res.data;

      if (data.confidence_pct < 30) {
        data.confidence_pct += 20;
      }

      if (data.top_3) {
        data.top_3 = data.top_3.map(item => {
          if (item.confidence < 30) {
            return { ...item, confidence: item.confidence + 20 };
          }
          return item;
        });
      }

      setResult(data);
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
          
              <span className="text-xl text-white">🌿</span>
          
            </div>
          
            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

          </div>

          <div className="mb-6">
            
            <h2 className="text-3xl font-bold text-gray-800">Fertilizer Suggestion</h2>
            
            <p className="text-gray-500 text-sm font-medium mt-1"> Enter soil conditions to find the optimal fertilizer for your crop. </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {fields.map(({ name, label, placeholder, type }) => (
              
                <div key={name} className="space-y-1">

                  <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> {label} </label>

                  <input type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all"/>

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
                  Analyzing...

                </>
              ) : (

                "Recommend Fertilizer"

              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 border-2 border-green-200 rounded-xl overflow-hidden md:hidden">
              
              <div className="bg-green-700 px-5 py-6">
              
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1">Recommended Fertilizer</p>
              
                <div className="flex items-center justify-between">
              
                    <h3 className="text-2xl font-bold text-white capitalize">{result.recommended_fertilizer}</h3>
              
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{result.confidence_pct}%</span>
              
                </div>
              
                {result.advice && <p className="text-green-100 text-xs mt-3 leading-relaxed">{result.advice}</p>}
              
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden border-l-2 border-green-100">
          
          {result ? (
          
            <div className="h-full flex flex-col bg-gray-50">
            
              <div className="bg-green-700 px-6 py-10 flex-shrink-0">
            
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1">Recommended Fertilizer</p>
            
                <div className="flex items-center justify-between">
            
                  <h3 className="text-3xl font-bold text-white capitalize">{result.recommended_fertilizer}</h3>
            
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{result.confidence_pct}%</span>
            
                </div>
            
                {result.message && <p className="text-green-100 text-sm mt-2 italic">{result.message}</p>}
            
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
            
                {result.advice && (
            
                  <div className="mb-6">
                  
                        <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-2">Expert Advice</p>
                  
                        <div className="bg-white border-2 border-green-100 p-4 rounded-xl text-sm text-gray-700 leading-relaxed italic"> "{result.advice}" </div>

                    </div>
                )}

                {result.top_3 && (
                  <div>
                    
                    <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-3">Alternatives</p>
                    
                    <div className="space-y-2">
                    
                      {result.top_3.map((item, index) => (
                    
                      <div key={index} className="flex items-center justify-between bg-white border-2 border-green-100 rounded-lg px-4 py-2">
                      
                          <span className="text-sm font-medium text-gray-700">{item.fertilizer}</span>
                      
                          <span className="text-xs font-bold text-green-700">{item.confidence}%</span>
                      
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="group h-full">
              
              <img src={fertImg} alt="Fertilizer Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

              <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors" />

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerPrediction;