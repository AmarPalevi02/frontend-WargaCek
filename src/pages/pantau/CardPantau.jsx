import React, { useEffect, useState } from 'react'
import images from '../../assets'

import { FaClock, FaMapMarkerAlt, FaRegThumbsDown, FaThumbsUp, FaUser, FaUsers } from 'react-icons/fa'
import SkeletonCard from '../../components/SkeletonCard'

const history = [
   {
      thumbnail: images.jalanrusak,
      title: "Kerusakan infrastruktur jalan",
      description: "Lubang sedalam 20 cm menyebabkan beberapa motor tergelincir. Sudah 5 hari belum diperbaiki.",
      location: "Jl. Merdeka No. 10",
      setuju: "12",
      waktu: "1",
      author: "marzky"
   },
   {
      thumbnail: images.jalanbanjir,
      title: "Jalan banjir",
      description: "Jalan tergenang air setinggi 30-50 cm akibat hujan deras sejak pagi. Arus lalu lintas diperlambat, kendaraan roda dua disarankan mencari alternatif. Genangan diperkirakan surut dalam 4-5 jam jika hujan reda. Petugas sedang memantau dan membersihkan saluran air tersumbat",
      location: "Jl. Ahmad Yani, depan Pasar Induk",
      setuju: "12",
      waktu: "1",
      author: "marzky"
   },
   {
      thumbnail: images.penutupanjalan,
      title: "Kerusakan penutupan jalan",
      description: "Jalan ditutup sementara akibat lubang besar sedalam 20 cm yang belum diperbaiki selama 5 hari. Tercatat 3 motor tergelincir dan 1 mobil mengalami kerusakan ban. Pengalihan arus dipasang melalui jalur kiri dengan rambu darurat. Perbaikan diperkirakan dimulai besok pagi.",
      location: "Jl. Merdeka, dekat pertokoan Serba 2000",
      setuju: "12",
      waktu: "1",
      author: "marzky"
   },

]

const CardPantau = () => {
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const timeout = setTimeout(() => {
         setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timeout)
   }, [])

   return (
      <>
         {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : history.map((data, i) => (
               <div key={i} className="bg-[#fff] rounded-xl overflow-hidden shadow-md mb-4 max-w-md mx-auto">
                  <div className="h-40 w-full overflow-hidden p-2">
                     <img src={data.thumbnail} alt="Laporan" className="w-full h-full object-cover rounded-lg" />
                  </div>

                  <div className="p-4">
                     <h2 className="text-lg font-semibold text-black mb-1">
                        {data.title}
                     </h2>

                     <p className="text-sm text-gray-800 mb-4 line-clamp-3 text-justify">
                        {data.description}
                     </p>

                     <div className="grid grid-cols-2 gap-2 text-sm text-black mb-4">
                        <div className="flex items-center gap-2">
                           <FaMapMarkerAlt />
                           <span className='line-clamp-3'>{data.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <FaUsers />
                           <span>{data.setuju} orang setuju</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <FaClock />
                           <span>{data.waktu} yang lalu</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <FaUser />
                           <span>Oleh @{data.author}</span>
                        </div>
                     </div>

                     {/* Tombol Aksi */}
                     <div className="flex gap-3 flex-wrap justify-evenly ">
                        <button className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm">
                           <FaThumbsUp className="text-base sm:text-lg md:text-xl hidden sm:inline" />
                           Saya melihat ini
                        </button>
                        <button className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm">
                           <FaRegThumbsDown className="text-base sm:text-lg md:text-xl hidden sm:inline" />
                           tidak melihat ini
                        </button>
                     </div>
                  </div>
               </div>
            ))}
      </>
   )
}

export default CardPantau