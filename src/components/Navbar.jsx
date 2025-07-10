import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
   return (
      <nav className='w-full fixed bottom-10 px-6 left-0'>
         <ul className="flex justify-between rounded-[30px] py-3 px-3 shadow-2xl bg-gradient-to-br from-[#f0f4f8] via-[#e5eaf1] to-[#f7f9fc]">
            <Link className='flex flex-col items-center' to={'/home'}>
               <FaHome className='text-2xl' />
               <p className='text-sm'>Home</p>
            </Link>
            <Link className='flex flex-col items-center' to={'/map'}>
               <FaMapMarkerAlt className='text-2xl' />
               <p className='text-sm'>Map</p>
            </Link>
            <Link className='flex flex-col items-center' to={'/tambahlaporan'}>
               <FaPlus className='text-3xl' />
               {/* <p>Home</p> */}
            </Link>
            <Link className='flex flex-col items-center' to={'/pantau'}>
               <FaUsers className='text-2xl' />
               <p className='text-sm'>Pantau</p>
            </Link>
            <Link className='flex flex-col items-center' to={'/profile'}>
               <FaUser className='text-2xl' />
               <p className='text-sm'>Profile</p>
            </Link>
         </ul>
      </nav>
   )
}

export default Navbar