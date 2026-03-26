import React, { useState } from "react"; 
import axios from "axios"; 
import feedbackImg from "../assets/f1.avif"; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/feedback/`; 

const FeedbackPage = () => { 
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "", 
    rating: 5, 
  }); 

  const [hover, setHover] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [responseMsg, setResponseMsg] = useState(""); 
  const [error, setError] = useState(""); 

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    setError(""); 
    setResponseMsg(""); 

    try { 
      const res = await axios.post(API_URL, formData); 
      setResponseMsg(res.data.message); 
      setFormData({ name: "", email: "", message: "", rating: 5 }); 
    } catch (err) { 
      setError("Failed to submit feedback."); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  return ( 
    // Reduced container padding from p-10 to py-8
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4"> 
      {/* max-w-4xl and reduced vertical padding (py-6) makes the card shorter */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row"> 
        
        {/* Left Side: Form - Reduced padding from p-12 to p-6/8 */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-md">
              <span className="text-lg">🌿</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}>
                GreenHand
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Feedback</h2>
          <p className="text-gray-500 mb-5 text-sm font-medium">We value your input.</p>
 
          {/* Reduced space-y from 5 to 3 */}
          <form onSubmit={handleSubmit} className="space-y-3"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1">Name</label>
                <input 
                  type="text" name="name" placeholder="Name" 
                  value={formData.name} onChange={handleChange} required 
                  className="w-full border-2 border-gray-100 bg-gray-50 p-2 rounded-lg text-sm focus:outline-none focus:border-green-500 transition-all" 
                /> 
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1">Email</label>
                <input 
                  type="email" name="email" placeholder="Email" 
                  value={formData.email} onChange={handleChange} required 
                  className="w-full border-2 border-gray-100 bg-gray-50 p-2 rounded-lg text-sm focus:outline-none focus:border-green-500 transition-all" 
                /> 
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1">Experience</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-2xl transition-all transform ${
                      star <= (hover || formData.rating) ? "scale-110 text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1">Message</label>
              <textarea 
                name="message" placeholder="Message..." 
                value={formData.message} onChange={handleChange} required 
                // Reduced height from h-32 to h-20
                className="w-full border-2 border-gray-100 bg-gray-50 p-2 rounded-lg text-sm focus:outline-none focus:border-green-500 transition-all h-20 resize-none" 
              /> 
            </div>
 
            <button 
              type="submit" disabled={loading} 
              className="w-full bg-green-700 text-white py-3 rounded-xl font-bold uppercase tracking-widest shadow-md hover:bg-green-800 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-2 text-xs"
            > 
              {loading ? "Sending..." : "Submit"} 
            </button> 
          </form> 
 
          {responseMsg && <div className="mt-2 text-xs text-green-700 text-center font-bold">{responseMsg}</div>} 
        </div>

        {/* Right Side: Image - height automatically adjusts to the form's height */}
        <div className="hidden md:block md:w-5/12 relative overflow-hidden">
          <img 
            src={feedbackImg} 
            alt="Farming" 
            className="w-full h-full object-cover" 
          />
        </div>

      </div> 
    </div> 
  ); 
}; 

export default FeedbackPage;