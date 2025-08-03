import React, { useEffect, useState, useRef } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/Navbar'
import DamageTypeDropdown from './DamageTypeDropdown'

import { useDispatch, useSelector } from 'react-redux'
import { fetchingJenisKejadian } from '../../redux/getJenisKerusakan/action'

import LocationMarkerUser from './LocationMarkerUser'


const Laporan = () => {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(null);

   const { data } = useSelector((state) => state.jenisKerusakan)

   useEffect(() => {
      dispatch(fetchingJenisKejadian())
   }, [dispatch])


   const handleLocationChange = (coords) => {
      setLocation(coords)
      console.log('Koordinat lokasi terkini:', coords)
   }

   return (
      <PageLayout>
         <Navbar />
         <div className="pt-5">
            <div className="">
               <h1 className='text-xl font-semibold'>Laporkan Kondisi Sekitarmu</h1>
               <p className='text-justify mt-5 leading-7'>Bantu sesama warga dengan mengunggah laporan tentang kerusakan jalan, banjir, atau gangguan lainnya. Satu laporanmu bisa berdampak besar.</p>
            </div>

            <form className='mt-10'>
               <DamageTypeDropdown
                  data={data?.data || []}
                  selected={selected}
                  setSelected={setSelected}
                  open={open}
                  setOpen={setOpen}
               />

               <div className='w-full h-50 flex justify-center mt-10'>
                  <LocationMarkerUser
                     className="w-full max-w-lg h-80 z-0"
                     initialCenter={{ lat: -7.3170944, lng: 112.7317504 }}
                     zoom={13}
                     onLocationChange={handleLocationChange}
                  />
               </div>
            </form>
         </div>
      </PageLayout>
   )
}

export default Laporan