import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '10K+', label: 'Farmers Helped' },
  { value: '95%', label: 'Prediction Accuracy' },
  { value: '6', label: 'Smart Features' },
  { value: '24/7', label: 'AI Support' },
]

const CTA = () => {
  return (
    <section className="w-full bg-[#f7faf7] py-20 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">

        <div className="relative w-full rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)' }}>

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
            
            <defs>
            
              <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            
                <circle cx="2" cy="2" r="1.5" fill="#fff" />
            
              </pattern>
            
            </defs>
            
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          
          </svg>

          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full" style={{ background: 'rgba(134,239,172,0.12)', filter: 'blur(40px)' }}
          />

          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', filter: 'blur(40px)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-8 sm:px-12 py-14">

            <div className="flex-1 text-center lg:text-left">

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-white/10 backdrop-blur-sm mb-6">
                
                <span className="text-green-200 text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Georgia', serif" }}> Start Today — It's Free </span>

              </div>
 
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow" style={{ fontFamily: "'Georgia', serif" }}> Ready to Grow <br /> <span className="text-green-300">Smarter?</span> </h2>

              <p className="text-white/85 text-base font-semibold leading-relaxed max-w-md mx-auto lg:mx-0 mb-8" style={{ fontFamily: "'Georgia', serif" }}> Join thousands of farmers already using GreenHand to predict crops, forecast prices, and maximise every harvest. </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">

                <Link to="/signup" className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-green-700 text-sm font-extrabold uppercase tracking-[0.12em] shadow-lg" style={{ fontFamily: "'Georgia', serif" }}>

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                    
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  
                  </svg>
                  
                  Get Started Free
                
                </Link>

                <Link to="/feature" className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 text-white text-sm font-extrabold uppercase tracking-[0.12em]" style={{ fontFamily: "'Georgia', serif" }}>

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m0 0l-6.75-6.75M20.25 12l-6.75 6.75" />
                
                  </svg>
                
                  Explore Features
                
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:flex-shrink-0">
              {stats.map(({ value, label }) => (
                
                <div key={label} className="flex flex-col items-center gap-1 px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15"
                >

                  <span className="text-2xl font-extrabold text-green-400 drop-shadow" style={{ fontFamily: "'Georgia', serif" }}> {value} </span>

                  <span className="text-white/85 text-[11px] font-bold uppercase tracking-wider text-center leading-tight" style={{ fontFamily: "'Georgia', serif" }}> {label} </span>

                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {[
            { icon: (
                
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                
                </svg>
              ), label: 'No credit card required' },
            { icon: (
                
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                
                </svg>
              ), label: 'Setup in under 2 minutes' },
            { icon: (
                
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                
                </svg>
              ), label: '24/7 AI chatbot support' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              
              <span className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center flex-shrink-0"> {icon} </span>
              
              <span className="text-gray-500 text-sm font-semibold" style={{ fontFamily: "'Georgia', serif" }}> {label} </span>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTA