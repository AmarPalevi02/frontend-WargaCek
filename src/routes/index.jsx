import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Maps from '../pages/maps'

const AppRoute = () => {
   return (
      <Routes>
         <Route path='/' element={<LandingPage />} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
         <Route path='/maps' element={<Maps />} />
      </Routes>
   )
}

export default AppRoute