import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Home', 'About', 'Feature', 'Feedback', 'Team']
  // const navLinks = ['Home', 'About', 'Feature', 'Feedback']
  
  const getHref = (link) => (link === 'Home' ? '/' : `/${link.toLowerCase()}`)

  // Determine active link from current URL path
  const isActive = (link) => {
    if (link === 'Home') return location.pathname === '/'
    return location.pathname === `/${link.toLowerCase()}`
  }

  return (
    <nav className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 border-b border-green-100 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>

      <div className="hidden md:grid grid-cols-3 items-center h-[68px] w-full px-8 lg:px-3">

        <div className="flex items-center justify-start">

          <a href="/" className="flex items-center gap-2.5 group">

            <div className="w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center shadow group-hover:bg-green-700 transition-colors duration-200">

              <span className="text-xl">🌿</span>

            </div>

            <div className="flex flex-col leading-tight">

              <span className="text-lg font-extrabold text-green-700 tracking-[0.12em]" style={{ fontFamily: "'Georgia', serif" }}>GreenHand</span>

            </div>

          </a>
        </div>

        <div className="flex items-center justify-center">

          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (

              <li key={link}>

                <Link to={getHref(link)} className={`relative px-5 py-2 text-[13px] font-bold uppercase tracking-[0.1em] rounded-lg transition-all duration-200 ${isActive(link) ? 'text-green-700 bg-green-200' : 'text-gray-500 hover:text-green-600 hover:bg-green-50'}`}> {link} </Link>

              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end">

          <a href="/login" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 text-white text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">

            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />

            </svg>

            Login

          </a>
        </div>

      </div>

      <div className="flex md:hidden items-center justify-between h-[64px] px-5">

        <a href="/" className="flex items-center gap-2 group">

          <div className="w-9 h-9 rounded-xl bg-green-800 flex items-center justify-center shadow group-hover:bg-green-700 transition-colors duration-200">

            <span className="text-lg">🌿</span>

          </div>

          <span className="text-base font-extrabold text-green-700 tracking-widest" style={{ fontFamily: "'Georgia', serif" }}>GreenHand</span>

        </a>

        <button className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-green-50 transition-colors" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle menu" >

          <span className={`block w-5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />

          <span className={`block w-5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />

          <span className={`block w-5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />

        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-green-100 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>

        <ul className="flex flex-col px-6 py-4 gap-1">

          {navLinks.map((link) => (

            <li key={link}>

              <Link to={getHref(link)} onClick={() => setMenuOpen(false)} className={`flex items-center px-4 py-3 text-sm font-semibold uppercase tracking-widest rounded-xl transition-colors duration-200 ${isActive(link) ? 'text-green-700 bg-green-50' : 'text-gray-500 hover:text-green-600 hover:bg-green-50'}`}> {link} </Link>

            </li>
          ))}

          <li className="mt-3">

            <a href="/login" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-600 text-white text-sm font-bold uppercase tracking-widest hover:bg-green-700 transition-colors duration-200 shadow">

              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">

                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />

              </svg>

              Login

            </a>
          </li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
