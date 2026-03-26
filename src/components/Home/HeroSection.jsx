import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../assets/Hero.avif'

const HeroSection = () => {
  const stats = [
    { value: '10K+', label: 'Farmers Helped' },
    { value: '95%', label: 'Prediction Accuracy' },
    { value: '6', label: 'Smart Features' },
    { value: '24/7', label: 'AI Chatbot Support' },
  ]

  const features = [
    { label: 'Crop Prediction' },
    { label: 'Crop Price Forecast' },
    { label: 'Yield Analysis' },
    { label: 'Fertilizer Analysis' },
    { label: 'Weather Forecast' },
  ]

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${Hero})`,}} />

      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/60 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-24 flex flex-col items-center text-center">

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl" style={{ fontFamily: "'Georgia', serif" }}>

          Grow Smarter.{' '}

          <span className="relative inline-block">

            <span className="text-green-400">Harvest</span>

          </span>

          <br />

          <span className="text-green-400">Better.</span>

        </h1>

        <p className="text-white/90 text-lg sm:text-xl font-semibold max-w-2xl mb-4 leading-relaxed drop-shadow-lg"> GreenHand uses cutting-edge AI to predict crop yields, forecast market prices, and deliver real-time weather insights — all built for the modern farmer. </p>

        <p className="text-green-300 text-sm font-bold uppercase tracking-widest mb-10"> Your farm. Your data. Your future. </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          
          {features.map(({ label }) => (
          
          <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">

              <span className="text-white text-xs font-bold uppercase tracking-wider">{label}</span>

            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">

          <Link to="/feature" className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-green-600 text-white text-sm font-extrabold uppercase tracking-[0.12em] shadow-xl shadow-green-900/50" style={{ fontFamily: "'Georgia', serif" }}>

            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />

            </svg>

            Explore Features

          </Link>

          <Link to="/login" className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-extrabold uppercase tracking-[0.12em]" style={{ fontFamily: "'Georgia', serif" }}>

            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />

            </svg>

            Get Started Free

          </Link>
        </div>

        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          {stats.map(({ value, label }) => (
          
          <div key={label} className="flex flex-col items-center gap-1 px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">

              <span className="text-2xl font-extrabold text-green-300 drop-shadow" style={{ fontFamily: "'Georgia', serif" }}> {value} </span>

              <span className="text-white text-[11px] font-bold uppercase tracking-wider text-center leading-tight"> {label} </span>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection