import React from 'react'
import Header from '../components/Home/Header'
import Navbar from '../components/Home/Navbar'
import HeroSection from '../components/Home/HeroSection'
import HowItWorks from '../components/Home/HowItWorks'
import CTA from '../components/Home/CTA'
import Feature from '../components/Home/Features'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div>
     <Header />
     <Navbar />
     <HeroSection />
     <Feature />
     <HowItWorks />
     <CTA />
     <Footer />
    </div>
  )
}

export default Home