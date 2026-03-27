import React from 'react'
import SignupComp from '../components/SighupComp'
import Header from '../components/Home/Header'
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Home/Footer'

const Signup = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <SignupComp />
      <Footer />
    </div>
  )
}

export default Signup