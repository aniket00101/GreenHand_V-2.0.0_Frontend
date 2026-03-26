import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import feedbackImg from "../assets/f1.avif";

const LoginComponent = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false, // Added detail
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
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

              <span className="text-xl text-white">🌿</span>

            </div>

            <span className="text-xl font-extrabold text-green-700 tracking-wider" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

          </div>

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>

            <p className="text-gray-500 text-sm font-medium mt-1"> Please enter your details to access your account. </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1">

              <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> Email Address </label>

              <input type="email" placeholder="name@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all"/>

            </div>

            <div className="space-y-1 relative">
              <div className="flex justify-between items-center">

                <label className="text-[10px] font-bold uppercase text-green-700 tracking-widest ml-1"> Password </label>

              </div>

              <div className="relative">

                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full border-2 border-green-500 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:border-green-600 transition-all"/>
                
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"> {showPassword ? "Hide" : "Show"} </button>

              </div>
            </div>

            <div className="flex items-center ml-1">

              <input id="remember" type="checkbox" checked={form.rememberMe} onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"/>

              <label htmlFor="remember" className="ml-2 text-xs text-gray-600 cursor-pointer"> Remember me for 30 days </label>

            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">

                <p className="text-[11px] text-red-600 font-bold text-center uppercase tracking-tight"> {error} </p>

              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-green-800 hover:shadow-green-200 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-2 text-xs flex justify-center items-center gap-2">

              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : "Sign In"}
            </button>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600"> Don't have an account?{" "}

                <span onClick={() => navigate("/signup")} className="text-green-700 font-bold cursor-pointer hover:underline"> Create an account </span>

              </p>

              <div onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-gray-600 text-md cursor-pointer hover:text-green-700 transition-colors group">

                <span className="group-hover:-translate-x-1 transition-transform">←</span>

                <span>Back to Home</span>

              </div>
            </div>

          </form>
        </div>

        <div className="hidden md:block md:w-5/12 relative overflow-hidden group">

          <img src={feedbackImg} alt="Login Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

          <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors"></div>

        </div>

      </div>
    </div>
  );
};

export default LoginComponent;