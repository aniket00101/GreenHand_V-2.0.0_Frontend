import { useState, useEffect } from "react";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Weather from "../UserPages/Weather";
import CropPrediction from "../UserPages/CropPrediction";
import FertilizerPrediction from "../UserPages/FertilizerPrediction";
import CropPrice from "../UserPages/CropPrice";
import CropYield from "../UserPages/CropYield";
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'

const FEATURES = [
  {
    key: "crop-prediction",
    label: "Crop Prediction",
    component: <CropPrediction />,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    key: "crop-price",
    label: "Crop Price",
    component: <CropPrice />,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    key: "crop-yield",
    label: "Crop Yield",
    component: <CropYield />,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    key: "fertilizer",
    label: "Fertilizer",
    component: <FertilizerPrediction />,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    key: "weather",
    label: "Weather",
    component: <Weather />,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("crop-prediction");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try { user = jwtDecode(token); } catch (_) { }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const activeFeature = FEATURES.find((f) => f.key === activeKey);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">

        <nav className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 border-b border-green-100 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>

          <div className="hidden md:flex items-center justify-between h-[68px] w-full px-8 lg:px-6 gap-4">

            <div className="flex items-center justify-start flex-shrink-0">

              <div  className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center shadow group-hover:bg-green-700 transition-colors duration-200">

                  <span className="text-xl">🌿</span>

                </div>

                <h2 className="text-2xl font-extrabold text-green-800" style={{ fontFamily: "'Georgia', serif" }}> 
                  
                  Welcome{" "}  <span className="text-green-600">{user?.name ?? "Farmer"}</span> 
                
                </h2>
                
              </div>
            </div>

            <div className="flex items-center justify-center flex-1">

              <ul className="flex items-center gap-0.5">

                {FEATURES.map((f) => {

                  const isActive = activeKey === f.key;

                  return (

                    <li key={f.key}>

                      <button onClick={() => setActiveKey(isActive ? null : f.key)} title={f.label} className={`relative flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold uppercase tracking-[0.1em] rounded-lg transition-all duration-200 whitespace-nowrap border ${isActive ? "text-green-700 bg-green-100 border-green-300 shadow-md shadow-green-100" : "text-gray-500 border-transparent hover:text-green-600 hover:bg-green-50"}`}>

                        {f.label}

                        {isActive && (
                          <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-4 h-[3px] rounded-full bg-green-600" />
                        )}

                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 flex-shrink-0">
              
              <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />
                </svg>

                Logout

              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between h-[64px] px-5">
            
            <a href="/" className="flex items-center gap-2 group">
            
              <div className="w-9 h-9 rounded-xl bg-green-800 flex items-center justify-center shadow group-hover:bg-green-700 transition-colors duration-200">
            
                <span className="text-lg">🌿</span>
            
              </div>
            
              <h2 className="text-2xl font-extrabold text-green-800" style={{ fontFamily: "'Georgia', serif" }}> 
                
                Welcome{" "} <span className="text-green-600">{user?.name ?? "Farmer"} </span> 
              
              </h2>

            </a>
            
            <button className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-green-50 transition-colors" onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu">

              <span className={`block w-5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              
              <span className={`block w-5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              
              <span className={`block w-5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            
            </button>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-green-100 ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
            
            <div className="px-6 py-4 flex flex-col gap-1">
            
              {FEATURES.map((f) => {
            
            const isActive = activeKey === f.key;
            
            return (
            
              <button key={f.key} onClick={() => { setActiveKey(isActive ? null : f.key); setMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-widest rounded-xl transition-colors duration-200 w-full text-left ${isActive ? "text-green-700 bg-green-100" : "text-gray-500 hover:text-green-600 hover:bg-green-50"}`}> {f.icon} {f.label} </button>
                );
              })}

              <div className="mt-3 pt-3 border-t border-green-100 flex flex-col gap-2">

                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-colors duration-200 shadow">

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">

                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />

                  </svg>

                  Logout

                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="w-full">

          {activeFeature && (

            <div key={activeKey} className="animate-fadeIn w-full"> {activeFeature.component} </div>

          )}
        </main>

        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.22s ease-out both; }
      `}</style>

      </div>
      
      <Footer />
    </>
  );
}