import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import feedbackImg from "../assets/f1.avif";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/feedback/`;

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 3,
  });

  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      setResponseMsg(res.data.message || "Feedback sent successfully!");
      // Reset form after a short delay or immediately
      setFormData({ name: "", email: "", message: "", rating: 3 });
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 font-sans">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

        <div className="flex-1 p-6 lg:p-10">

          <div className="flex items-center gap-3 mb-6">
           
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
           
              <span className="text-xl text-white">🌿</span>
           
            </div>
           
            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

          </div>

          <div className="mb-6">
           
            <h2 className="text-3xl font-bold text-gray-800">Share Feedback</h2>
           
            <p className="text-gray-500 text-sm font-medium mt-1"> How can we make GreenHand better for you? </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
              <div className="space-y-1">

                <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> Full Name </label>

                <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600 transition-all"/>

              </div>

              <div className="space-y-1">

                <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> Email Address </label>

                <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600 transition-all"/>

              </div>
            </div>

            <div className=" p-4 rounded-xl border border-green-100">

              <label className="text-[13px] font-bold uppercase text-green-700 tracking-widest block mb-2"> Overall Experience </label>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                   
                   <button key={star} type="button" className={`text-3xl transition-all duration-200 transform hover:scale-125 ${star <= (hover || formData.rating) ? "text-yellow-400 drop-shadow-sm" : "text-gray-300" }`} onClick={() => setFormData({ ...formData, rating: star })} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}> ★ </button>

                  ))}
                </div>

                <span className="text-sm font-bold text-green-800 bg-white px-3 py-1 rounded-full shadow-sm"> {hover || formData.rating} / 5 </span>

              </div>
            </div>

            <div className="space-y-1">

              <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> Your Thoughts </label>

              <textarea name="message" placeholder="Tell us what's on your mind..." value={formData.message} onChange={handleChange} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:border-green-600 transition-all h-28 resize-none"/>

            </div>

            {error && (

              <div className="bg-red-50 border-l-4 border-red-500 p-2 text-[11px] text-red-600 font-bold uppercase text-center"> {error} </div>

            )}

            {responseMsg && (
              <div className="bg-green-100 border-l-4 border-green-500 p-2 text-[11px] text-green-800 font-bold uppercase text-center animate-bounce"> {responseMsg} </div>

            )}

            <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-green-800 hover:shadow-green-200 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-2 text-xs flex justify-center items-center gap-2">

              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : "Send Feedback"}
            </button>

            <div className="mt-6 text-center">

              <div onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-gray-600 text-md cursor-pointer hover:text-green-700 transition-colors group">

                <span className="group-hover:-translate-x-1 transition-transform">←</span>

                <span>Back to Home</span>

              </div>
            </div>

          </form>
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden group">

          <img src={feedbackImg} alt="Feedback Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

          <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors"></div>
          
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;