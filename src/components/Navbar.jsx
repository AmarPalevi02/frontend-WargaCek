import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaPlus, FaUsers, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Navbar = () => {
   const { token, username, email, role } = Cookies.get('auth')
      ? JSON.parse(Cookies.get('auth'))
      : {};

   return (
      <>
         {token && username && email && role && (
            <div className="fixed bottom-10 left-0 w-full z-50 flex justify-center">
               <div className="w-full max-w-lg px-6">
                  <nav className="w-full">
                     <ul className="flex justify-between rounded-[30px] py-3 px-3 shadow-2xl bg-gradient-to-br from-[#f0f4f8] via-[#e5eaf1] to-[#f7f9fc]">
                        <NavLink
                           to="/"
                           className={({ isActive }) =>
                              `flex flex-col items-center ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`
                           }
                        >
                           <FaHome className="text-2xl" />
                           <p className="text-sm">Home</p>
                        </NavLink>

                        <NavLink
                           to="/maps"
                           className={({ isActive }) =>
                              `flex flex-col items-center ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`
                           }
                        >
                           <FaMapMarkerAlt className="text-2xl" />
                           <p className="text-sm">Map</p>
                        </NavLink>

                        <NavLink
                           to="/tambahlaporan"
                           className={({ isActive }) =>
                              `flex flex-col items-center ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`
                           }
                        >
                           <FaPlus className="text-3xl" />
                        </NavLink>

                        <NavLink
                           to="/pantau"
                           className={({ isActive }) =>
                              `flex flex-col items-center ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`
                           }
                        >
                           <FaUsers className="text-2xl" />
                           <p className="text-sm">Pantau</p>
                        </NavLink>

                        <NavLink
                           to="/profile"
                           className={({ isActive }) =>
                              `flex flex-col items-center ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`
                           }
                        >
                           <FaUser className="text-2xl" />
                           <p className="text-sm">Profile</p>
                        </NavLink>
                     </ul>
                  </nav>
               </div>
            </div>
         )}
      </>
   );
};

export default Navbar;
