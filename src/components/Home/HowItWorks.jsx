import React from 'react'
import { Link } from 'react-router-dom'

const steps = [
  {
    step: '01',
    label: 'Create Your Account',
    tag: 'Get Started',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    points: [
      'Enter your name, email and password to register',
      'Account setup takes less than a minute',
      'Login instantly after signup to begin',
    ],
  },
  {
    step: '02',
    label: 'Enter Your Farm Data',
    tag: 'Input Data',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    points: [
      'Provide soil nutrients — Nitrogen, Phosphorous, Potassium',
      'Add temperature, humidity, pH and rainfall values',
      'Enter crop year, area, season and state details',
    ],
  },
  {
    step: '03',
    label: 'Get Crop Recommendation',
    tag: 'Crop Predict',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    points: [
      'AI recommends the best crop for your soil and climate',
      'See confidence score and top 3 crop alternatives',
      'Make informed planting decisions backed by data',
    ],
  },
  {
    step: '04',
    label: 'Forecast Crop Price',
    tag: 'Price Forecast',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
    points: [
      'Input crop, state, season and market arrival data',
      'Get predicted min, modal and max market prices',
      'Receive MSP reference and market insight summary',
    ],
  },
  {
    step: '05',
    label: 'Analyse Yield & Fertilizer',
    tag: 'Smart Analysis',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    points: [
      'Predict crop yield using area, production and rainfall',
      'Get fertilizer recommendations based on soil NPK values',
      'View top 3 fertilizer alternatives with confidence scores',
    ],
  },
  {
    step: '06',
    label: 'Monitor Live Weather',
    tag: 'Live Updates',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    points: [
      'Search any city to get real-time weather conditions',
      'View temperature, humidity, wind speed and feels like',
      'Plan irrigation and field work around live forecasts',
    ],
  },
]

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#f7faf7] py-20 px-6 lg:px-10">

      <div className="max-w-6xl mx-auto text-center mb-16">

        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
          From Sign Up to <span className="text-green-600">First Harvest</span>
        </h2>

        <p className="text-gray-500 text-base font-semibold max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}> Six simple steps to unlock the full power of AI-driven farming — no tech expertise needed. </p>

      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ gridAutoRows: '1fr' }}>
        {steps.map((s) => (
        
        <div key={s.step} className="flex flex-col bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">
        
            <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-600 flex-shrink-0" />
        
            <div className="flex flex-col flex-1 p-6">

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2.5">

                  <span className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white text-sm font-extrabold shadow-sm flex-shrink-0" style={{ fontFamily: "'Georgia', serif" }}> {s.step} </span>

                  <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: "'Georgia', serif" }}> {s.tag} </span>

                </div>

                <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 flex-shrink-0"> {s.icon} </div>

              </div>

              <h3 className="text-green-900 text-lg font-extrabold mb-3 leading-snug" style={{ fontFamily: "'Georgia', serif" }}> {s.label} </h3>

              <div className="w-10 h-0.5 bg-green-200 rounded-full mb-4" />

              <ul className="flex flex-col gap-3">
                {s.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                 
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                 
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                 
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                 
                      </svg>
                 
                    </span>
                 
                    <span className="text-gray-500 text-sm font-semibold leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}> {pt} </span>

                  </li>
                ))}
              </ul>

            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
        
        <p className="text-black text-lg font-semibold" style={{ fontFamily: "'Georgia', serif" }}> Ready to get started? It only takes <span className="text-green-600 font-bold">2 minutes</span> to set up. </p>
        
      </div>

    </section>
  )
}

export default HowItWorks