import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <section className="w-full min-h-screen bg-[#f7faf7] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">

      <div className="absolute opacity-[0.045] pointer-events-none select-none">
        
        <span className="text-green-700 font-black" style={{ fontSize: '220px', fontFamily: "'Georgia', serif", lineHeight: 1 }}>404</span>
      
      </div>

      <div className="flex items-center gap-2 mb-7 relative z-10">

        <span className="text-green-700 font-black leading-none" style={{ fontSize: '96px', fontFamily: "'Georgia', serif", letterSpacing: '-4px' }}>4</span>

        <div className="w-[88px] h-[88px] rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center mx-1.5">

          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">

            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />

            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12C12 12 8 9 8 6a4 4 0 018 0c0 3-4 6-4 6z" />

            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12C12 12 16 10 18 7" />

            <path strokeLinecap="round" strokeLinejoin="round" d="M8 17c-2-1-4-3-3-6" />

          </svg>
        </div>

        <span className="text-green-700 font-black leading-none" style={{ fontSize: '96px', fontFamily: "'Georgia', serif", letterSpacing: '-4px' }}>4</span>

      </div>

      <div className="bg-green-100 px-4 py-1 mb-5">

        <span className="text-green-700 text-[20px] font-bold uppercase tracking-widest" style={{ fontFamily: "'Georgia', serif" }}>Page Not Found</span>

      </div>

      <h1 className="text-green-900 text-3xl sm:text-4xl font-extrabold text-center mb-3 leading-tight max-w-lg" style={{ fontFamily: "'Georgia', serif" }}> Looks like this crop <span className="text-green-600">didn't take root</span> </h1>

      <p className="text-gray-500 text-sm font-semibold text-center max-w-sm leading-relaxed mb-9" style={{ fontFamily: "'Georgia', serif" }}> The page you're trying to access doesn't exist or may have been relocated. Let's get you back to cultivating the right path. </p>

      <div className="flex flex-wrap gap-3 justify-center mb-12">

        <Link to="/" className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-7 py-3 rounded-full transition-colors" style={{ fontFamily: "'Georgia', serif" }}> Return to Home Page </Link>

      </div>

    </section>
  )
}

export default Error404