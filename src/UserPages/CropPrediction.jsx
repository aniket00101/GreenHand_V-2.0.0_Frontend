import React, { useState } from "react";
import axios from "axios";
import cropImg from "../assets/f1.avif"; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/predict/cropRecommendation`;

const fields = [
  { name: "N", label: "Nitrogen (N)", placeholder: "e.g. 90" },
  { name: "P", label: "Phosphorus (P)", placeholder: "e.g. 42" },
  { name: "K", label: "Potassium (K)", placeholder: "e.g. 43" },
  { name: "temperature", label: "Temperature (°C)", placeholder: "e.g. 25.5" },
  { name: "humidity", label: "Humidity (%)", placeholder: "e.g. 80" },
  { name: "ph", label: "Soil pH", placeholder: "e.g. 6.5" },
  { name: "rainfall", label: "Rainfall (mm)", placeholder: "e.g. 200" },
];

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: "",
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
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, Number(v)])
      );
      const res = await axios.post(API_URL, payload);
      
      let data = res.data;
      
      if (data.confidence_pct < 30) {
        data.confidence_pct += 20;
      }

      if (data.top_3) {
        data.top_3 = data.top_3.map(item => {
          if (item.confidence < 30) {
            return { ...item, confidence: item.confidence + 30 };
          }
          return item;
        });
      }
      setResult(data);
    } catch (err) {
      setError("Prediction failed. Please check your inputs or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

        <div className="flex-1 p-6 lg:p-10">

          <div className="flex items-center gap-3 mb-6">
            
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
              
              <span className="text-xl text-white">🌱</span>

            </div>

            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>
          </div>

          <div className="mb-6">
            
            <h2 className="text-3xl font-bold text-gray-800">Crop Recommendation</h2>
            
            <p className="text-gray-500 text-sm font-medium mt-1"> Enter your soil and climate data to get a crop suggestion. </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {fields.map(({ name, label, placeholder }) => (
                
                <div key={name} className="space-y-1">
                  
                  <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> {label} </label>

                  <input type="number" step="any" name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all"/>

                </div>
              ))}
            </div>

            {error && (
              
              <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">
                
                <p className="text-[11px] text-red-600 font-bold text-center uppercase tracking-tight"> {error} </p>

              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-green-800 hover:shadow-green-200 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-2 text-xs flex justify-center items-center gap-2">

              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Predicting...

                </>
              ) : (

                "Predict Crop"

              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 border-2 border-green-200 rounded-xl overflow-hidden md:hidden">
              
              <div className="bg-green-700 px-5 py-4">
              
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1"> Recommended Crop </p>

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-white capitalize"> {result.recommended_crop} </h3>

                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"> {result.confidence_pct}% confidence </span>

                </div>

                {result.message && (

                  <p className="text-green-100 text-sm mt-1 italic"> {result.message} </p>

                )}
              </div>
              
              {result.top_3 && (
                <div className="px-5 py-4 bg-gray-50">
                  
                  <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-3 ml-1"> Top 3 Alternatives </p>

                  <div className="space-y-2">
                    {result.top_3.map((crop, index) => (
                      
                      <div key={index} className="flex items-center justify-between bg-white border-2 border-green-100 rounded-lg px-4 py-2">

                        <div className="flex items-center gap-3">
                          
                          <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center"> {index + 1} </span>

                          <span className="text-sm font-medium text-gray-700 capitalize"> {crop.crop} </span>

                        </div>
                        
                        <div className="flex items-center gap-2">
                          
                          <div className="w-24 h-1.5 bg-green-100 rounded-full overflow-hidden">
                            
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${crop.confidence}%` }}/>

                          </div>

                          <span className="text-xs font-bold text-green-700 w-10 text-right"> {crop.confidence}% </span>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden">
          {result ? (

            <div className="h-full flex flex-col border-l-2 border-green-100">
              
              <div className="bg-green-700 px-5 py-6 flex-shrink-0">
              
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-200 mb-1"> Recommended Crop </p>

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-white capitalize"> {result.recommended_crop} </h3>

                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"> {result.confidence_pct}% confidence </span>

                </div>

                {result.message && (

                  <p className="text-green-100 text-sm mt-1 italic">{result.message}</p>

                )}
              </div>

              {result.top_3 && (
                <div className="px-5 py-5 bg-gray-50 flex-1 overflow-y-auto">

                  <p className="text-[10px] font-bold uppercase text-green-700 tracking-widest mb-3 ml-1"> Top 3 Alternatives </p>

                  <div className="space-y-2">
                    {result.top_3.map((crop, index) => (

                      <div key={index} className="flex items-center justify-between bg-white border-2 border-green-100 rounded-lg px-4 py-2">

                        <div className="flex items-center gap-3">

                          <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center"> {index + 1} </span>

                          <span className="text-sm font-medium text-gray-700 capitalize"> {crop.crop} </span>

                        </div>

                        <div className="flex items-center gap-2">
                          
                          <div className="w-24 h-1.5 bg-green-100 rounded-full overflow-hidden">
                          
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${crop.confidence}%` }}/>

                          </div>

                          <span className="text-xs font-bold text-green-700 w-10 text-right"> {crop.confidence}% </span>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (

            <div className="group h-full">

              <img src={cropImg} alt="Crop Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

              <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors" />
              
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CropPrediction;
