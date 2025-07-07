import React from 'react'
import logo from '../assets/logo.png'

const LogoMaps = () => {
   return (
      <div className="flex flex-col justify-center w-full items-center">
         <img
            src={logo}
            className='w-44'
         />
         <div className="w-[150px] h-[4px] bg-[#ba1a1a] rounded-[10px]"></div>
      </div>
   )
}

export default LogoMaps