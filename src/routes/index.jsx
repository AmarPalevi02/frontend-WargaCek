import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Register from '../pages/Register'
import Login from '../pages/Login'

const AppRoute = () => {
   return (
      <Routes>
         <Route path='/' element={<LandingPage />} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
      </Routes>
   )
}

export default AppRoute