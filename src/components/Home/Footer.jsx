import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const features = [
    { label: 'Crop Prediction', href: '/feature#crop-prediction', icon: '' },
    { label: 'Crop Price Prediction', href: '/feature#crop-price', icon: '' },
    { label: 'Yield Prediction', href: '/feature#yield-prediction', icon: '' },
    { label: 'Fertilizer Prediction', href: '/feature#yield-price', icon: '' },
    { label: 'Weather Details', href: '/feature#weather', icon: '' },
  ]

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Features', href: '/feature' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Login', href: '/login' },
  ]

  return (
    <footer className="bg-green-700 text-white relative overflow-hidden">

      <div className="relative h-1 w-full bg-gradient-to-r from-green-400 via-green-200 to-green-400" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="lg:col-span-1 flex flex-col gap-5">

            <a href="/" className="flex items-center gap-3 w-fit">

              <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">

                <span className="text-2xl">🌿</span>

              </div>

              <div className="flex flex-col leading-tight">

                <span className="text-xl font-extrabold text-white tracking-[0.12em]" style={{ fontFamily: "'Georgia', serif" }} > GreenHand </span>

                <span className="text-white text-[10px] tracking-[0.2em] font-bold"> Smart Farming </span>

              </div>
            </a>

            <p className="text-white text-sm font-semibold leading-relaxed max-w-xs"> Empowering farmers with AI-driven insights — from crop predictions to real-time weather, all in one place. </p>

            <div className="hidden md:flex items-center gap-4">

              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/_aniketdas_?igsh=bHNuNTI4OW0yNG9t" className="text-white hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/aniket-das-7766b129a/" className="text-white hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">

            <h3 className="text-white text-sm font-bold uppercase tracking-[0.18em] mb-5 pb-2 border-b border-green-500" style={{ fontFamily: "'Georgia', serif" }}> Our Features </h3>

            <ul className="flex flex-col gap-3">
              {features.map(({ label, href, icon }) => (

                <li key={label}>

                  <Link to={href} className="flex items-center gap-2.5 text-white font-semibold text-sm">

                    <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />

                    <span>{label}</span>

                  </Link>

                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">

            <h3 className="text-white text-sm font-bold uppercase tracking-[0.18em] mb-5 pb-2 border-b border-green-500" style={{ fontFamily: "'Georgia', serif" }}> Quick Links </h3>

            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (

                <li key={label}>

                  <Link to={href} className="flex items-center gap-2 text-white font-semibold text-sm">

                    <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />

                    <span>{label}</span>

                  </Link>

                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">

            <h3 className="text-white text-sm font-bold uppercase tracking-[0.18em] mb-5 pb-2 border-b border-green-500" style={{ fontFamily: "'Georgia', serif" }}> Get Updated </h3>

            <p className="text-white text-sm font-semibold mb-6 leading-relaxed">Login to receive the latest farming insights, crop alerts, and feature updates tailored just for you.</p>

            <Link to="/login" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white text-green-500 text-sm font-extrabold uppercase tracking-[0.12em] shadow-md">

              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">

                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />

              </svg>

              Login to Get Updated

            </Link>

          </div>
        </div>

        <div className="h-px w-full bg-green-500 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white font-bold">

          <p> © {currentYear}{' '}

            <span className="font-bold" style={{ fontFamily: "'Georgia', serif" }}> GreenHand </span>

            . All rights reserved.

          </p>

          <div className="flex items-center gap-1 font-semibold">

            <span>Made with</span>

            <span className="text-base">🌿</span>

            <span>for farmers everywhere</span>

          </div>

          <div className="flex items-center gap-4">

            <a href="/privacy" className="font-semibold">Privacy Policy</a>

            <a href="/terms" className="font-semibold">Terms of Use</a>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer