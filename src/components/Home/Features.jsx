import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import f1 from '../../assets/f1.avif'
import f2 from '../../assets/f2.avif'
import f3 from '../../assets/f3.avif'
import f4 from '../../assets/f4.avif'
import f5 from '../../assets/f5.avif'
import f6 from '../../assets/f6.webp'

const features = [
  {
    label: 'Crop Prediction',
    description:
      'Leverage AI to predict the best crops suited for your soil type, region, and season. Make data-driven planting decisions with confidence.',
    image: f1,
    tag: 'AI Powered',
    href: '/feature/crop-prediction',
  },
  {
    label: 'Crop Price Forecast',
    description:
      'Stay ahead of the market with real-time crop price predictions. Know when to sell and maximize your profit margins every season.',
    image: f2,
    tag: 'Market Insights',
    href: '/feature/crop-price',
  },
  {
    label: 'Yield Analysis',
    description:
      'Get accurate yield estimates before harvest. Analyze historical data and current conditions to plan storage, logistics, and sales.',
    image: f3,
    tag: 'Data Driven',
    href: '/feature/yield-analysis',
  },
  {
    label: 'Fertilizer Analysis',
    description:
      'Get smart fertilizer recommendations tailored to your soil nutrients. Reduce costs and improve crop health with precision inputs.',
    image: f4,
    tag: 'Soil Health',
    href: '/feature/fertilizer',
  },
  {
    label: 'AI Chatbot',
    description:
      'Ask anything, anytime. Our 24/7 farming assistant answers your questions about crops, weather, diseases, and best practices instantly.',
    image: f5,
    tag: '24/7 Support',
    href: '/feature/chatbot',
  },
  {
    label: 'Weather Forecast',
    description:
      'Access hyper-local, real-time weather data for your farm. Plan irrigation, spraying, and harvesting around accurate forecasts.',
    image: f6,
    tag: 'Real-Time',
    href: '/feature/weather',
  },
]

const Features = () => {
  const [hovered, setHovered] = useState(null)

  const rows = [
    { big: 0, smalls: [1, 2] },
    { big: 5, smalls: [3, 4], reverse: true },
  ]

  return (
    <section className="w-full bg-[#f7faf7] py-20 px-6 lg:px-10">

      <div className="max-w-6xl mx-auto text-center mb-16">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-200 bg-white shadow-sm mb-5">
        
          <span className="w-2 h-2 rounded-full bg-green-500" />
        
          <span className="text-green-700 text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Georgia', serif" }}>What We Offer</span>
        
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4 leading-tight" style={{ fontFamily: "'Georgia', serif" }}> Smart Tools for 
          <span className="text-green-600">Every Farmer</span>

        </h2>

        <p className="text-gray-500 text-base font-semibold max-w-xl mx-auto leading-relaxed"> Six powerful AI features designed to transform the way you farm — from soil to sale. </p>

      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        
        {rows.map((row, ri) => (
        
        <div key={ri} className={`flex flex-col lg:flex-row gap-5 ${row.reverse ? 'lg:flex-row-reverse' : ''}`}>

            {(() => {
              const f = features[row.big]
              const isH = hovered === row.big
              
              return (
              
                <Link to={f.href} key={f.label} onMouseEnter={() => setHovered(row.big)} onMouseLeave={() => setHovered(null)} className="relative lg:w-[58%] rounded-3xl overflow-hidden shadow-sm flex flex-col min-h-[360px] cursor-pointer" style={{ flexShrink: 0 }}>
                  
                  <img src={f.image} alt={f.label} className="absolute inset-0 w-full h-full object-cover" style={{ transform: isH ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }}/>
                  
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

                  <div className="absolute top-5 left-5 flex items-center gap-2">

                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest"> {f.tag} </span>

                  </div>

                  <div className="relative mt-auto p-6">

                    <h3 className="text-white text-2xl font-extrabold mb-2 drop-shadow" style={{ fontFamily: "'Georgia', serif" }}> {f.label} </h3>
                   
                    <p className="text-white/80 text-sm font-semibold leading-relaxed max-w-sm"> {f.description} </p>
                    
                  </div>
                </Link>
              )
            })()}

            <div className="flex flex-col gap-5 flex-1">
              {row.smalls.map((fi) => {
                
                const f = features[fi]
                
                const isH = hovered === fi
                
                return (
                
                  <Link to={f.href} key={f.label} onMouseEnter={() => setHovered(fi)} onMouseLeave={() => setHovered(null)} className="relative rounded-3xl overflow-hidden flex-1 min-h-[165px] shadow-sm cursor-pointer">
                  
                    <img src={f.image} alt={f.label} className="absolute inset-0 w-full h-full object-cover" style={{ transform: isH ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.45s ease' }}/>
                  
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

                    <div className="relative h-full flex flex-col justify-between p-5">
                     
                      <div className="flex items-center justify-between">
                     
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest"> {f.tag} </span>
                        
                      </div>

                      <div>
                        
                        <h3 className="text-white text-base font-extrabold mb-1 drop-shadow" style={{ fontFamily: "'Georgia', serif" }}> {f.label} </h3>
                        
                        <p className="text-white/75 text-xs font-semibold leading-relaxed line-clamp-2"> {f.description} </p>
                      
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
        
        <p className="text-black text-lg font-semibold"> Trusted by <span className="text-green-600 font-bold">10,000+ farmers</span> across the country.</p>
        
      </div>
    </section>
  )
}

export default Features