import React from 'react'
import LoginComponent from '../components/LoginComponent'
import Header from '../components/Home/Header'
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Home/Footer'

const Login = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <LoginComponent />
      <Footer />
    </div>
  )
}

export default Login