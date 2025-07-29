import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingJenisKejadian } from '../../redux/getJenisKerusakan/action'
import { IoIosArrowDown } from "react-icons/io";


const Laporan = () => {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(null);


   const { data } = useSelector((state) => state.jenisKerusakan)

   useEffect(() => {
      dispatch(fetchingJenisKejadian())
   }, [dispatch])

   const handleSelect = (item) => {
      setSelected(item);
      onSelect?.(item);
      setOpen(false);
   };

   console.log(data.data)
   return (
      <PageLayout>
         <Navbar />
         <div className="pt-5">
            <div className="">
               <h1 className='text-xl font-semibold'>Laporkan Kondisi Sekitarmu</h1>
               <p className='text-justify mt-5 leading-7'>Bantu sesama warga dengan mengunggah laporan tentang kerusakan jalan, banjir, atau gangguan lainnya. Satu laporanmu bisa berdampak besar.</p>
            </div>


            <div className="w-full max-w-sm">
               <label className="block font-semibold mb-2">Jenis kerusakan/kejadian</label>
               <div className="relative">
                  <button
                     type="button"
                     onClick={() => setOpen(!open)}
                     className="w-full text-left px-4 py-2 bg-gray-200 rounded-md flex items-center justify-between"
                  >
                     {selected?.jenis_kerusakan || 'pilih kerusakan/kejadian'}
                     {open ? (
                        <IoIosArrowDown className="w-4 h-4 rotate-180 transition-transform duration-200" />
                     ) : (
                        <IoIosArrowDown className="w-4 h-4 transition-transform duration-200" />
                     )}
                  </button>

                  {open && (
                     <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                        {data?.data?.length > 0 ? (
                           data.data.map((item) => (
                              <li
                                 key={item.id}
                                 onClick={() => handleSelect(item)}
                                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                 {item.jenis_kerusakan}
                              </li>
                           ))
                        ) : (
                           <li className="px-4 py-2 text-gray-500">Data tidak tersedia</li>
                        )}
                     </ul>
                  )}
               </div>
            </div>
         </div>
      </PageLayout>
   )
}

export default Laporan