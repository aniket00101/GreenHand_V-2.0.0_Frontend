import React, { useState } from 'react'
import f1 from '../../assets/f1.avif'
import f2 from '../../assets/f2.avif'
import f3 from '../../assets/f3.avif'
import f4 from '../../assets/f4.avif'
import f5 from '../../assets/f5.avif'
import f6 from '../../assets/f6.webp'

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  .benefits-root { font-family: 'DM Sans', sans-serif; }
  .ph { font-family: 'Playfair Display', Georgia, serif; }
  .ph em { font-style: italic; color: #4a8c2a; }
  .b-card { transition: transform 0.24s cubic-bezier(.22,.68,0,1.2), box-shadow 0.24s; cursor: pointer; }
  .b-card:hover { transform: translateY(-6px); box-shadow: 0 24px 56px rgba(44,90,27,0.15) !important; }
  .b-card-img { transition: transform 0.5s cubic-bezier(.22,.68,0,1.2); }
  .b-card:hover .b-card-img { transform: scale(1.07); }
  .b-card-overlay { transition: opacity 0.3s; }
  .b-card:hover .b-card-overlay { opacity: 1 !important; }
  .accent-line { transition: width 0.35s ease, background 0.35s ease; }
  .featured-img { transition: transform 0.6s cubic-bezier(.22,.68,0,1.2); }
  .featured-img:hover { transform: scale(1.03); }
  .dot-btn { transition: width 0.22s ease, background 0.22s ease; }
  .grain-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  }
`

const features = [
  {
    label: 'Crop Prediction',
    description: 'Leverage AI to predict the best crops suited for your soil type, region, and season. Make data-driven planting decisions with confidence.',
    image: f1,
    tag: 'AI Powered',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>,
  },
  {
    label: 'Crop Price Forecast',
    description: 'Stay ahead of the market with real-time crop price predictions. Know when to sell and maximize your profit margins every season.',
    image: f2,
    tag: 'Market Insights',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" /></svg>,
  },
  {
    label: 'Yield Analysis',
    description: 'Get accurate yield estimates before harvest. Analyze historical data and current conditions to plan storage, logistics, and sales.',
    image: f3,
    tag: 'Data Driven',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  },
  {
    label: 'Fertilizer Analysis',
    description: 'Get smart fertilizer recommendations tailored to your soil nutrients. Reduce costs and improve crop health with precision inputs.',
    image: f4,
    tag: 'Soil Health',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5" /></svg>,
  },
  {
    label: 'AI Chatbot',
    description: 'Ask anything, anytime. Our 24/7 farming assistant answers your questions about crops, weather, diseases, and best practices instantly.',
    image: f5,
    tag: '24/7 Support',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
  },
  {
    label: 'Weather Forecast',
    description: 'Access hyper-local, real-time weather data for your farm. Plan irrigation, spraying, and harvesting around accurate forecasts.',
    image: f6,
    tag: 'Real-Time',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>,
  },
]

const Benefits = () => {
  const [active, setActive] = useState(null)
  const [featured, setFeatured] = useState(0)

  return (
    <div className="benefits-root">
      <style>{fontImport}</style>

      <section className="grain-bg w-full py-20 px-5 lg:px-10 bg-[#f7faf7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
          
            <h2 className="ph text-[2.2rem] sm:text-[2.8rem] font-semibold text-[#1c3a10] leading-[1.1] mb-4"> Everything your farm <em>needs</em><br className="hidden sm:block" /> to thrive </h2>

            <p className="text-[0.88rem] text-gray-700 font-normal max-w-lg leading-relaxed"> Six powerful tools — one seamless platform. Built for farmers who want to work smarter, reduce risk, and grow with confidence. </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {features.map((f, i) => (
              
              <div key={i} className="b-card bg-[#fffdf8] rounded-2xl overflow-hidden border border-[#e8e2d4]" style={{ boxShadow: '0 2px 14px rgba(60,80,40,0.07)', outline: featured === i ? '2px solid #7ab648' : 'none', outlineOffset: '2px', }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onClick={() => setFeatured(i)} >
               
                <div className="relative h-40 overflow-hidden">
                  
                  <img src={f.image} alt={f.label} className="b-card-img w-full h-full object-cover" />

                  <span className="absolute top-3 left-3 text-[0.57rem] font-bold uppercase tracking-[0.14em] text-white bg-green-700/80 backdrop-blur-sm border border-green-500/30 px-2.5 py-0.5 rounded-full"> {f.tag} </span>

                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-2">

                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0" style={{ background: 'linear-gradient(135deg,#eef6e6,#d6edbb)' }}> {f.icon} </div>

                    <h3 className="ph text-[1rem] font-semibold text-[#1c3a10] leading-snug">{f.label}</h3>

                  </div>

                  <p className="text-[0.79rem] text-[#7a9060] leading-relaxed">{f.description}</p>

                  <div className="accent-line mt-4 h-[2px] rounded-full" style={{ background: active === i ? 'linear-gradient(90deg,#4a8c2a,#a3e26a)' : '#f0ebe0', width: active === i ? '100%' : '1.75rem',}}/>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Benefits