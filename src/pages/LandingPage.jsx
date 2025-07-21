import React from 'react'
import Button from '../components/ui/Button'
import LogoWc from '../components/LogoWc'
import Navbar from '../components/Navbar';
import PageLayout from '../components/layout/PageLayout';
import useAuthToken from '../hooks/useAuthToken';

import { FaPlusCircle } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { FaRoute } from "react-icons/fa";


const LandingPage = () => {
   const { token, username, email, role } = useAuthToken()

   return (
      <PageLayout>
         <Navbar />
         {!token || !username || !email || !role ? (
            <div className="flex justify-end pt-6 gap-3">
               <Button variant="primary" size="md" to="/login">Login</Button>
               <Button variant="secondary" size="md" to="/register">Register</Button>
            </div>
         ) : ("")}

         <div className="text-center pt-14">
            <LogoWc className="text-2xl" />
            <h1 className='text-lg font-medium mt-1'>Info Jalan dari Warga, untuk Warga.</h1>
         </div>

         <p className='text-justify mt-5 leading-7'>
            Meningkatkan partisipasi aktif masyarakat dalam melaporkan kondisi infrastruktur seperti kerusakan jalan, banjir, dan penutupan jalan secara real-time.
         </p>

         <div className="w-full bg-[#9BDCC5] rounded-md px-3 py-5 mt-6">
            <div className="flex items-center gap-2 mb-3.5">
               <FaPlusCircle className='text-3xl text-[#6b5778]' />
               <p className='text-base'>Melaporkan kerusakan (lokasi, foto, deskripsi)</p>
            </div>

            <div className="flex items-center gap-2 mb-3.5">
               <FaMapMarkerAlt className='text-3xl text-red-400' />
               <p className='text-base'>Menampilkan laporan kerusakan</p>
            </div>

            <div className="flex items-center gap-2 mb-3.5">
               <BiSolidBarChartSquare className='text-3xl text-[#437057]' />
               <p className='text-base'>Voting pada laporan kerusakan</p>
            </div>

            <div className="flex items-center gap-2">
               <FaRoute className='text-3xl' />
               <p className='text-base'>Menampilkan rute alternatif</p>
            </div>
         </div>

         <div className="w-full bg-[#9BDCC5] rounded-md px-3 py-5 mt-5">
            <h2 className='text-2xl font-semibold'>Tujuan</h2>
            <p className='text-justify leading-7 mt-2'>
               Menyediakan platform digital berbasis crowdsourcing yang memungkinkan warga untuk saling berbagi dan memverifikasi informasi lapangan secara cepat dan akurat.
            </p>
         </div>
      </PageLayout>
   )
}

export default LandingPage
